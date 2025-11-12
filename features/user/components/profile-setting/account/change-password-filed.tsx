"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldError, FieldGroup } from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Spinner } from "@/components/ui/spinner";
import { useCustomToast } from "@/features/nav/hooks/useCustomToast";
import {
  ResPasswordError,
  updatePassword,
} from "@/features/user/api/update-password";
import { ApiResponse } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { DialogDescription } from "@radix-ui/react-dialog";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Eye, EyeClosed, LockKeyhole, PenBox, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import z from "zod";

const ChangePasswordField = () => {
  const { showToast } = useCustomToast();
  const [showPassword, setShowPassword] = useState(false);
  const [open, setOpen] = useState(false);

  const changePasswordSchema = z
    .object({
      password: z
        .string()
        .min(8, "رمز عبور حداقل باید ۸ کاراکتر باشد")
        .regex(/[A-Z]/, "رمز عبور باید حداقل شامل یک حرف بزرگ انگلیسی باشد")
        .regex(/[a-z]/, "رمز عبور باید حداقل شامل یک حرف کوچک انگلیسی باشد")
        .regex(/[0-9]/, "رمز عبور باید حداقل شامل یک عدد باشد"),
      // .regex(/[^A-Za-z0-9]/,"رمز عبور باید حداقل شامل یک کاراکتر خاص باشد") // like !@#$
      confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "رمز عبور و تکرار آن یکسان نیستند",
      path: ["confirmPassword"],
    });
  const form = useForm<z.infer<typeof changePasswordSchema>>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const { mutate: changePassword, isPending } = useMutation({
    mutationFn: updatePassword,
    onSuccess: (res) => {
      showToast(res.message, "success");
      form.reset();
      setOpen(false);
    },
    onError: (error: AxiosError<ApiResponse<ResPasswordError>>) => {
      const message =
        error.response?.data.message || "مشکلی پیش اومد، لطفا دوباره تلاش کنید";
      showToast(message, "error");
    },
  });

  const onSubmit = (data: z.infer<typeof changePasswordSchema>) => {
    const { password, confirmPassword } = data;
    changePassword({
      password,
      confirmPassword,
    });
  };

  return (
    <div className="flex flex-col gap-3 w-full max-w-sm m-auto py-4 relative">
      <div className="flex justify-between items-center ">
        <h2 className="flex justify-end order-1">تغییر رمز عبور</h2>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant={"ghost"}>
              <PenBox />
            </Button>
          </DialogTrigger>
          <DialogContent showCloseButton={false} className="!max-w-[425px]">
            <DialogHeader className="!text-right">
              <DialogTitle>تغییر رمز عبور</DialogTitle>
              <DialogDescription className="text-sm dark:text-muted text-gray-500">
                رمز عبور جدید خود را وارد کنید
              </DialogDescription>
            </DialogHeader>
            <form
              id="change-password-form"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <FieldGroup>
                <Controller
                  name="password"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field>
                      <InputGroup>
                        <InputGroupInput
                          {...field}
                          aria-invalid={fieldState.invalid}
                          autoComplete="off"
                          type={showPassword ? "text" : "password"}
                          id="password"
                          placeholder="رمز عبور"
                          disabled={isPending}
                        />
                        <InputGroupAddon className="pr-2">
                          <LockKeyhole />
                        </InputGroupAddon>
                        <InputGroupAddon align={"inline-end"}>
                          <Button
                            variant={"ghost"}
                            type="button"
                            onClick={() => setShowPassword((val) => !val)}
                            size={"sm"}
                          >
                            {showPassword ? <Eye /> : <EyeClosed />}
                          </Button>
                        </InputGroupAddon>
                      </InputGroup>
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                <Controller
                  name="confirmPassword"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field>
                      <InputGroup>
                        <InputGroupInput
                          {...field}
                          aria-invalid={fieldState.invalid}
                          autoComplete="off"
                          type={showPassword ? "text" : "password"}
                          id="confirmPassword"
                          placeholder="تایید رمز عبور"
                          disabled={isPending}
                        />
                        <InputGroupAddon className="pr-2">
                          <ShieldCheck />
                        </InputGroupAddon>
                        <InputGroupAddon align={"inline-end"}>
                          <Button
                            variant={"ghost"}
                            onClick={() => setShowPassword((val) => !val)}
                            size={"sm"}
                            type="button"
                          >
                            {showPassword ? <Eye /> : <EyeClosed />}
                          </Button>
                        </InputGroupAddon>
                      </InputGroup>
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </FieldGroup>
            </form>

            <DialogFooter>
              <Field orientation={"horizontal"}>
                <DialogClose asChild>
                  <Button
                    variant={"cancel"}
                    type="button"
                    onClick={() => form.reset()}
                  >
                    انصراف
                  </Button>
                </DialogClose>
                <Button
                  aria-label="Confirm"
                  disabled={isPending}
                  type="submit"
                  form="change-password-form"
                >
                  {isPending ? (
                    <>
                      {" "}
                      <Spinner scale={"0.8"} /> درحال ذخیره..{" "}
                    </>
                  ) : (
                    "ذخیره تغییرات"
                  )}
                </Button>
              </Field>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default ChangePasswordField;

"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import useCountdown from "@/features/auth/hooks/useCountdown";
import { SendOtpForm } from "@/features/auth/schemas/credentialSchema";
import { otpSchema, OtpSchema } from "@/features/auth/schemas/otpSchema";
import { useCustomToast } from "@/features/nav/hooks/useCustomToast";
import { emailCredentialApi } from "@/features/user/api/change-credential";
import { useUserStore } from "@/features/user/store/useUserStore";
import { cn, emailRegex } from "@/lib/utils";
import { ApiResponse } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Check, Mail, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import z from "zod";

const ChangeEmailField = () => {
  const { user } = useUserStore();
  const queryClient = useQueryClient();
  const [showButtons, setShowButtons] = useState(false);
  const [email, setEmail] = useState(user?.email || "");
  //   const [isChecking, setIsChecking] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const { showToast } = useCustomToast();
  const [otpExpireTime, setOtpExpireTime] = useState<string | null>("");
  const { minutes, seconds } = useCountdown(otpExpireTime);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    setEmail(user?.email ?? "");
  }, [user]);

  // normalize + validate email
  const emailSchema = z.preprocess((val) => {
    if (typeof val !== "string") return val;
    return val.trim().toLowerCase();
  }, z.string().regex(emailRegex, "ایمیل معتبر نیست"));

  // otp form input
  const { handleSubmit, control, reset } = useForm<OtpSchema>({
    resolver: zodResolver(otpSchema),
    defaultValues: { code: "" },
  });

  // send mutation
  const { mutate: sendEmailOtp, isPending: isSendingOtp } = useMutation({
    mutationFn: (data: { credential: string }) =>
      emailCredentialApi.sendOtp(data),
    onSuccess: (res) => {
      setOtpExpireTime(res.data?.expiredAt as string);
      showToast(res.message, "success");
      setOpenDialog(true);
    },
    onError: (error: AxiosError<ApiResponse>) => {
      const message =
        error.response?.data?.message || "مشکلی پیش اومد، دوباره تلاش کنید";
      showToast(message, "error");
    },
  });

  // check mutation
  const {
    mutate: checkEmailOtp,
    isPending: isCheckingOtp,
    isError,
  } = useMutation({
    mutationFn: (data: { credential: string; code: number }) =>
      emailCredentialApi.checkOtp(data),
    onSuccess: (res) => {
      showToast(res.message, "success");
      queryClient.invalidateQueries({
        predicate: (query) =>
          query.queryKey[0] === "userInfo" ||
          query.queryKey[0] === "notifications",
      });
      setShowButtons(false);
      setOpenDialog(false);
      reset();
    },
    onError: (error: AxiosError<ApiResponse>) => {
      const message =
        error.response?.data?.message || "مشکلی پیش اومد، دوباره تلاش کنید";
      showToast(message, "error");
    },
  });

  const handleConfirm = () => {
    const parsed = emailSchema.safeParse(email);
    if (!parsed.success) {
      const msg = parsed.error.issues?.[0]?.message || "ایمیل معتبر نیست";
      showToast(msg, "error");
      return;
    }
    sendEmailOtp({ credential: parsed.data });
  };

  const handleCancel = () => {
    setEmail(user?.email || "");
    setShowButtons(false);
    inputRef.current?.blur();
  };

  const onOtpSubmit = (data: OtpSchema) => {
    checkEmailOtp({
      credential: email,
      code: Number(data.code),
    });
  };

  const onResend = (values: SendOtpForm) => {
    reset();
    sendEmailOtp(values);
  };

  return (
    <div className="flex flex-col gap-2 w-full max-w-sm mx-auto py-6 relative">
      <Label htmlFor="email" className="flex justify-end">
        تغییر ایمیل
      </Label>
      <div className="flex gap-2 items-center">
        <InputGroup>
          <InputGroupInput
            value={email}
            autoComplete="off"
            ref={inputRef}
            id="email"
            onFocus={() => setShowButtons(true)}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isSendingOtp}
          />
          <InputGroupAddon>
            <Mail />
          </InputGroupAddon>
          <InputGroupAddon align={"inline-end"}>
            {isSendingOtp && <Spinner />}
          </InputGroupAddon>
        </InputGroup>

        {showButtons && (
          <>
            <Button variant="destructive" size="icon" onClick={handleCancel}>
              <X size={16} />
            </Button>
            <Button size="icon" disabled={isSendingOtp} onClick={handleConfirm}>
              <Check size={16} />
            </Button>
          </>
        )}
      </div>
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent showCloseButton={false} className="!max-w-[315px]">
          <DialogClose
            className="absolute left-3 top-3"
            onClick={() => setShowButtons(false)}
          >
            <X size={"20px"} />
          </DialogClose>
          <DialogHeader className="!text-right">
            <DialogTitle>تایید ایمیل</DialogTitle>
            <DialogDescription className="text-sm dark:text-muted text-gray-500">
              کد ارسال شده به {email} را وارد کنید
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit(onOtpSubmit)}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="otp">کد تایید</FieldLabel>

                <Controller
                  control={control}
                  name="code"
                  render={({ field }) => (
                    <InputOTP
                      id="otp"
                      maxLength={6}
                      value={field.value}
                      onChange={field.onChange}
                    >
                      <InputOTPGroup className="gap-2.5 *:data-[slot=input-otp-slot]:rounded-md *:data-[slot=input-otp-slot]:border">
                        <InputOTPSlot index={5} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={0} />
                      </InputOTPGroup>
                    </InputOTP>
                  )}
                />
              </Field>

              <FieldGroup>
                <Button
                  type="submit"
                  disabled={isCheckingOtp}
                  className={cn("w-full", isError && "animate-shake")}
                >
                  {isCheckingOtp ? (
                    <>
                      {" "}
                      <Spinner scale={"0.8"} /> درحال ذخیره..{" "}
                    </>
                  ) : (
                    "ذخیره"
                  )}
                </Button>
                <FieldDescription className="text-center flex flex-col ">
                  <span>
                    {" "}
                    کدی دریافت نکردید؟
                    <Button
                      variant={"link"}
                      disabled={
                        (minutes && seconds) > 0 || isSendingOtp ? true : false
                      }
                      className="p-1"
                      onClick={() =>
                        onResend({
                          credential: email,
                        })
                      }
                    >
                      ارسال دوباره
                    </Button>
                  </span>
                  <span dir="ltr">
                    {minutes} : {seconds.toString().padStart(2, "0")}
                  </span>
                </FieldDescription>
              </FieldGroup>
            </FieldGroup>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ChangeEmailField;

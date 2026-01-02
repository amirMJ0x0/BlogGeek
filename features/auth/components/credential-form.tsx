"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { cn, num2en } from "@/lib/utils";
import loginBanner from "@/public/assets/images/login-banner.jpeg";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { ChangeEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { useAuthActions } from "../hooks/useAuthActions";
import {
  LoginWithPassForm,
  loginWithPassSchema,
  SendOtpForm,
  sendOtpSchema,
} from "@/features/auth";

export function CredentialForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [passwordMode, setPasswordMode] = useState<boolean>(false);
  const { sendOtp, loginWithPassword, isSendingOtp, isLoggingIn } =
    useAuthActions();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    watch,
  } = useForm<LoginWithPassForm | SendOtpForm>({
    resolver: zodResolver(passwordMode ? loginWithPassSchema : sendOtpSchema),
    defaultValues: { credential: "", password: "" },
  });

  const onSubmit = async (values: SendOtpForm | LoginWithPassForm) => {
    if (passwordMode) {
      await loginWithPassword(values as LoginWithPassForm);
    } else {
      await sendOtp(values as SendOtpForm);
    }
  };

  const handleCredentialChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const normalized = num2en(value);

    if (value !== normalized) {
      setValue("credential", normalized, {
        shouldValidate: true,
        shouldDirty: true,
      });
    }
  };

  const togglePasswordMode = () => {
    setPasswordMode((prev) => !prev);
    reset({ credential: watch("credential"), password: "" });
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form
            className="px-6 !pt-20 !pb-24"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex flex-col gap-5">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">خوش آمدید</h1>
                <p className="text-muted-foreground text-balance">
                  ورود | ثبت نام
                </p>
              </div>
              <div className="grid gap-3">
                <Label htmlFor="credential">ایمیل یا شماره</Label>
                <Input
                  id="credential"
                  placeholder="example@mail.com یا 0912..."
                  required
                  {...register("credential")}
                  onChange={handleCredentialChange}
                  disabled={isSendingOtp || isLoggingIn}
                />
                {errors.credential && (
                  <p className="text-sm text-destructive !-mt-1">
                    {errors.credential.message as string}
                  </p>
                )}
              </div>
              {passwordMode && (
                <div className="grid gap-3">
                  <Label htmlFor="credential">رمز عبور</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="abc123"
                    required
                    {...register("password")}
                    disabled={isLoggingIn || !passwordMode}
                  />
                  {passwordMode &&
                    errors &&
                    "password" in errors &&
                    errors.password && (
                      <p className="text-sm text-destructive !-mt-1">
                        {errors.password.message as string}
                      </p>
                    )}
                </div>
              )}
              <div className="-mt-2">
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isSendingOtp || isLoggingIn}
                >
                  {passwordMode ? "ورود" : "ادامه"}{" "}
                  {(isSendingOtp || isLoggingIn) && <Spinner />}
                </Button>
              </div>
              <Button
                variant={"link"}
                type="button"
                className="text-sm text-slate-700 dark:text-white/50 text-center !underline"
                onClick={togglePasswordMode}
                disabled={isSendingOtp || isLoggingIn}
              >
                {passwordMode ? "ورود با کد تایید" : "ورود با رمز عبور"}
              </Button>
            </div>
          </form>
          <div className="bg-muted relative hidden md:block">
            <Image
              src={loginBanner}
              alt="Image"
              placeholder="blur"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        ورود شما به معنای پذیرش <Link href="#">شرایط بلاگیک</Link> و{" "}
        <Link href="#">قوانین حریم خصوصی</Link> است.
      </div>
    </div>
  );
}

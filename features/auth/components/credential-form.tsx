"use client";
import { cn, num2en } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import loginBanner from "@/public/login-banner.jpeg";
import Link from "next/link";
import { useAuthStore } from "@/store/authStore";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import {
  loginWithPassSchema,
  sendOtpSchema,
  SendOtpForm,
  LoginWithPassForm,
} from "../schemas/credentialSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSendOtp } from "../hooks/useSendOtp";
import { Spinner } from "@/components/ui/spinner";
import { Bounce, toast } from "react-toastify";
import { AxiosError } from "axios";
import { ApiResponse } from "../types";
import { ChangeEvent, useState } from "react";
import { useLoginWithPass } from "../hooks/useLoginWithPass";

export function CredentialForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter();
  const [passwordMode, setPasswordMode] = useState<boolean>(false);
  const { setCredential, setOtpExpireTime, clearCredential } = useAuthStore();
  const { mutate: mutateSendOtp, isPending: isSendingOtp } = useSendOtp();
  const { mutate: mutateLoginWithPass, isPending: IsLoggingIn } =
    useLoginWithPass();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    watch,
  } = useForm<SendOtpForm | LoginWithPassForm>({
    resolver: zodResolver(passwordMode ? loginWithPassSchema : sendOtpSchema),
    defaultValues: { credential: "", password: "" },
  });

  const onSubmit = (values: SendOtpForm | LoginWithPassForm) => {
    if (passwordMode) {
      mutateLoginWithPass(values, {
        onSuccess: (res) => {
          clearCredential();
          router.push("/");
          toast.success(res.message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
            rtl: true,
          });
        },
        onError: (error: AxiosError<ApiResponse>) => {
          const message =
            error.response?.data?.message || "مشکلی پیش اومد، دوباره تلاش کنید";
          toast.error(message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
            rtl: true,
          });
        },
      });
      return;
    } else {
      mutateSendOtp(values, {
        onSuccess: (res) => {
          setCredential(values.credential);
          setOtpExpireTime(res.data?.expiredAt as string);

          toast.success(res?.message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
            rtl: true,
          });

          router.push("/verify");
        },
        onError: (error: AxiosError<ApiResponse>) => {
          const message =
            error.response?.data?.message || "مشکلی پیش اومد، دوباره تلاش کنید";

          toast.error(message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
            rtl: true,
          });
        },
      });
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
                  disabled={isSendingOtp}
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
                    placeholder="abc123"
                    required
                    {...register("password")}
                    disabled={IsLoggingIn || !passwordMode}
                  />
                  {errors.password && (
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
                  disabled={isSendingOtp || IsLoggingIn}
                >
                  {passwordMode ? "ورود" : "ادامه"}{" "}
                  {(isSendingOtp || IsLoggingIn) && <Spinner />}
                </Button>
              </div>
              <Button
                variant={"link"}
                type="button"
                className="text-sm text-slate-700 text-center !underline"
                onClick={togglePasswordMode}
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

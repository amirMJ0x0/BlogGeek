"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useCheckOtp } from "../hooks/useCheckOtp";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/features/auth/store/useAuthStore";
import { Controller, useForm } from "react-hook-form";
import { otpSchema, OtpSchema } from "../schemas/otpSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Bounce, toast } from "react-toastify";
import useCountdown from "../hooks/useCountdown";
import { useSendOtp } from "../hooks/useSendOtp";
import { AxiosError } from "axios";
import { cn } from "@/lib/utils";
import { useEffect } from "react";
import { SendOtpForm } from "../schemas/credentialSchema";
import { ApiResponse } from "@/types";
import { useUserStore } from "@/features/user/store/useUserStore";
import { fetchUserInfo } from "@/features/user/api/fetch-userinfo";

export function VerifyForm({ ...props }: React.ComponentProps<typeof Card>) {
  const { clearCredential, credential, otpExpireTime, setOtpExpireTime } =
    useAuthStore();
  const { setUser } = useUserStore();
  const {
    mutate: mutateCheckOtp,
    isPending: isCheckingOtp,
    isError,
  } = useCheckOtp();
  const { mutate: mutateSendOtp, isPending: isSendingOtp } = useSendOtp();
  const router = useRouter();
  const { minutes, seconds } = useCountdown(otpExpireTime);
  const { handleSubmit, control, reset } = useForm<OtpSchema>({
    resolver: zodResolver(otpSchema),
    defaultValues: { code: "" },
  });

  useEffect(() => {
    if (!credential) {
      router.push("/login");
      return;
    }
  }, []);

  const onSubmit = (data: OtpSchema) => {
    if (!credential) {
      router.push("/login");
      return;
    }

    mutateCheckOtp(
      { credential, code: Number(data.code) },
      {
        onSuccess: async (res) => {
          clearCredential();
          try {
            const user = await fetchUserInfo();
            setUser(user);
          } catch (e) {
            console.log(e);
          }
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
          console.log(error);
          reset();
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
      }
    );
  };

  const onResend = (values: SendOtpForm) => {
    reset();
    mutateSendOtp(values, {
      onSuccess: (res) => {
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
      },
    });
  };
  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>کد تایید را وارد کنید</CardTitle>
        <CardDescription>
          یک کد ۶ رقمی به <span className="font-bold">{credential}</span> ارسال
          شد
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
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
                تایید
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
                        credential: credential as string,
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
      </CardContent>
    </Card>
  );
}

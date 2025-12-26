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
import { useCustomToast } from "@/features/nav/hooks/useCustomToast";
import { useAuthStore } from "@/features/user/store/useAuthStore";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useAuthActions } from "../hooks/useAuthActions";
import useCountdown from "../hooks/useCountdown";
import { otpSchema, OtpSchema, SendOtpForm } from "../schemas/auth.schemas";

export function VerifyForm({ ...props }: React.ComponentProps<typeof Card>) {
  const { credential, otpExpireTime } = useAuthStore();
  const router = useRouter();
  const { minutes, seconds } = useCountdown(otpExpireTime);
  const { verifyOtp, isCheckingOtp, isCheckError, sendOtp, isSendingOtp } =
    useAuthActions();

  const { handleSubmit, control, reset } = useForm<OtpSchema>({
    resolver: zodResolver(otpSchema),
    defaultValues: { code: "" },
  });

  useEffect(() => {
    if (!credential) {
      router.push("/login");
      return;
    }
  }, [router, credential]);

  const onSubmit = async (data: OtpSchema) => {
    await verifyOtp(data);
  };

  const onResend = async (values: SendOtpForm) => {
    reset();
    try {
      await sendOtp(values);
    } catch {}
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
                className={cn("w-full", isCheckError && "animate-shake")}
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

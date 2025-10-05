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
import Link from "next/link";
import { useCheckOtp } from "../hooks/useCheckOtp";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { Controller, useForm } from "react-hook-form";
import { otpSchema, OtpSchema } from "../schemas/otpSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Bounce, toast } from "react-toastify";

export function VerifyForm({ ...props }: React.ComponentProps<typeof Card>) {
  const { clearCredential, credential } = useAuthStore();
  const { mutate, isPending } = useCheckOtp();
  const router = useRouter();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<OtpSchema>({
    resolver: zodResolver(otpSchema),
    defaultValues: { code: "" },
  });

  const onSubmit = (data: OtpSchema) => {
    if (!credential) {
      router.push("/login");
      return;
    }

    mutate(
      { credential, code: Number(data.code) },
      {
        onSuccess: () => {
          clearCredential();
          router.push("/");
          toast.success("کاربر عزیز، با موفقیت وارد شدید!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
          });
        },
      }
    );
  };

  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>کد تایید را وارد کنید</CardTitle>
        <CardDescription>ما یک کد ۶ رقمی برات فرستادیم مشتی</CardDescription>
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

              <FieldDescription>
                کدی که دریافت کردید را وارد کنید
              </FieldDescription>
            </Field>

            <FieldGroup>
              <Button type="submit">تایید</Button>
              <FieldDescription className="text-center">
                کدی دریافت نکردید؟ <a href="#">ارسال دوباره</a>
              </FieldDescription>
            </FieldGroup>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}

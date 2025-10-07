import { VerifyForm } from "@/features/auth/components/verify-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "تایید کد ورود",
  description:
    "کد تایید ارسال‌شده به شماره یا ایمیل خود را وارد کنید تا وارد حساب کاربری بلاگ‌گیک شوید. اگر کدی دریافت نکردید می‌توانید دوباره درخواست ارسال کنید.",
};

export default function OTPPage() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-xs">
        <VerifyForm />
      </div>
    </div>
  );
}

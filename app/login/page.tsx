import { CredentialForm } from "@/features/auth/components/credential-form";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "ورود به بلاگ‌گیک",
  description:
    "برای ورود به حساب کاربری خود در بلاگ‌گیک، شماره موبایل یا ایمیل خود را وارد کنید. کد تایید برای شما ارسال خواهد شد.",
};

export default function LoginViaOtp() {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-3xl">
        <CredentialForm />
      </div>
    </div>
  );
}

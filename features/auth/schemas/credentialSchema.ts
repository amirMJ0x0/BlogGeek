import { emailRegex, phoneNumberRegex } from "@/lib/utils";
import { z } from "zod";

// برای ورود با OTP
export const sendOtpSchema = z.object({
  credential: z
    .string()
    .min(5, "حداقل ۵ کاراکتر وارد کنید")
    .refine(
      (val) => emailRegex.test(val) || phoneNumberRegex.test(val),
      "ایمیل یا شماره موبایل معتبر وارد کنید"
    ),
});

export const loginWithPassSchema = z.object({
  credential: z
    .string()
    .min(5, "حداقل ۵ کاراکتر وارد کنید")
    .refine(
      (val) => emailRegex.test(val) || phoneNumberRegex.test(val),
      "ایمیل یا شماره موبایل معتبر وارد کنید"
    ),
  password: z.string().min(8, "رمز عبور باید حداقل شامل ۸ کاراکتر باشد"),
});

export type SendOtpForm = z.infer<typeof sendOtpSchema>;
export type LoginWithPassForm = z.infer<typeof loginWithPassSchema>;

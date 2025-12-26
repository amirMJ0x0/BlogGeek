import { emailRegex, phoneNumberRegex } from "@/lib/utils";
import { z } from "zod";

const sendOtpSchema = z.object({
  credential: z
    .string()
    .min(5, "حداقل ۵ کاراکتر وارد کنید")
    .refine(
      (val) => emailRegex.test(val) || phoneNumberRegex.test(val),
      "ایمیل یا شماره موبایل معتبر وارد کنید"
    ),
});

const loginWithPassSchema = z.object({
  credential: z
    .string()
    .min(5, "حداقل ۵ کاراکتر وارد کنید")
    .refine(
      (val) => emailRegex.test(val) || phoneNumberRegex.test(val),
      "ایمیل یا شماره موبایل معتبر وارد کنید"
    ),
  password: z.string().min(8, "رمز عبور باید حداقل شامل ۸ کاراکتر باشد"),
});

const LoginWithOtpSchema = z.object({
  emailOrPhoneNumber: z
    .string()
    .min(3, "ایمیل یا شماره را وارد کنید")
    .regex(emailRegex, "ایمیل نامعتبر است"),
  password: z.string().optional(),
});

const otpSchema = z.object({
  code: z.string().length(6, "کد باید ۶ رقمی باشد"),
});

export { otpSchema, LoginWithOtpSchema, loginWithPassSchema, sendOtpSchema };
export type SendOtpForm = z.infer<typeof sendOtpSchema>;
export type LoginWithPassForm = z.infer<typeof loginWithPassSchema>;
export type OtpSchema = z.infer<typeof otpSchema>;

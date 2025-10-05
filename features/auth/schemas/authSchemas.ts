import { emailRegex } from "@/lib/utils";
import z from "zod";

export const LoginSchema = z.object({
  emailOrPhoneNumber: z.string().min(3, "ایمیل یا شماره را وارد کنید").regex(emailRegex,'ایمیل نامعتبر است'),
  password: z.string().optional(),
});

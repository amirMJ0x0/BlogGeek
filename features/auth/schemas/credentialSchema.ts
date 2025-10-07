import { emailRegex, phoneNumberRegex } from "@/lib/utils";
import { z } from "zod";

export const credentialSchema = z.object({
  credential: z
    .string()
    .min(5, "حداقل ۵ کاراکتر وارد کنید")
    .refine(
      (val) => emailRegex.test(val) || phoneNumberRegex.test(val),
      "ایمیل یا شماره موبایل معتبر وارد کنید"
    ),
  password: z
    .string()
    .min(4, "رمز عبور باید حداقل شامل ۴ کاراکتر باشد")
    .optional(),
});

export type CredentialSchema = z.infer<typeof credentialSchema>;

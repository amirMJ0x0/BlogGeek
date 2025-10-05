import { z } from "zod";

export const otpSchema = z.object({
  code: z.string().length(6, "کد باید ۶ رقمی باشد"),
});

export type OtpSchema = z.infer<typeof otpSchema>;

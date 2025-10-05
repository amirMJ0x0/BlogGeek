import z from "zod";

export const IdentifierSchema = z.object({
  identifier: z.string().min(3, "ایمیل یا شماره را وارد کنید"),
  password: z.string().optional(),
});

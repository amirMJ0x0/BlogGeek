import { validSocialUrl } from "@/lib/utils";
import { z } from "zod";

const patterns = {
  instagram: /^(https?:\/\/)?(www\.)?instagram\.com\/[A-Za-z0-9._%-]+\/?$/i,
  linkedin: /^(https?:\/\/)?(www\.)?linkedin\.com\/in\/[A-Za-z0-9._%-]+\/?$/i,
  twitter:
    /^(https?:\/\/)?(www\.)?(twitter\.com|x\.com)\/[A-Za-z0-9._%-]+\/?$/i,
  telegram: /^(https?:\/\/)?(www\.)?t\.me\/[A-Za-z0-9._%-]+\/?$/i,
  github: /^(https?:\/\/)?(www\.)?github\.com\/[A-Za-z0-9._%-]+\/?$/i,
};

const socialUrl = (platform: keyof typeof patterns) =>
  z
    .string()
    .optional()
    .refine(
      (url) => {
        if (!url) return true;
        return patterns[platform].test(url.trim());
      },
      {
        message: `لینک ${platform} معتبر نیست! فرمت صحیح مثلاً: ${
          platform !== "telegram"
            ? `https://${platform}.com/yourname`
            : `https://t.me/yourname`
        }`,
      }
    )
    .refine(
      (url) => !url || url.trim().length === 0 || !/^\d+$/.test(url.trim()),
      {
        message: `شناسه ${platform} نمی‌تواند فقط شامل اعداد باشد`,
      }
    )
    .refine((url) => !url || !/[\u0600-\u06FF]/.test(url.trim()), {
      message: `شناسه ${platform} نمی‌تواند شامل حروف فارسی باشد`,
    });

export const profileInfoSchema = z.object({
  first_name: z
    .string()
    .transform((val) => val.trim())
    .optional()
    .refine(
      (val) => !val || val.trim().length === 0 || !/^\d+$/.test(val.trim()),
      {
        message: "نام نمی‌تواند فقط شامل اعداد باشد",
      }
    )
    .refine((val) => !val || val.trim().length > 0, {
      message: "نام نمی‌تواند خالی باشد",
    }),

  last_name: z
    .string()
    .transform((val) => val.trim())
    .optional()
    .refine(
      (val) => !val || val.trim().length === 0 || !/^\d+$/.test(val.trim()),
      {
        message: "نام خانوادگی نمی‌تواند فقط شامل اعداد باشد",
      }
    )
    .refine((val) => !val || val.trim().length > 0, {
      message: "نام خانوادگی نمی‌تواند خالی باشد",
    }),

  birthday: z.string().optional(),

  bio: z
    .string()
    .transform((val) => val.trim())
    .optional()
    .refine(
      (val) => !val || val.trim().length === 0 || val.trim().length <= 400,
      {
        message: "بیوگرافی نمی‌تواند بیش از 400 کاراکتر باشد",
      }
    )
    .refine((val) => !val || val.trim().length > 0, {
      message: "بیوگرافی نمی‌تواند خالی باشد",
    }),

  // Social media fields
  telegram: socialUrl("telegram"),

  instagram: socialUrl("instagram"),

  linkedin: socialUrl("linkedin"),

  twitter: socialUrl("twitter"),
  github: socialUrl("github"),
});

export type ProfileInfoFormData = z.infer<typeof profileInfoSchema>;

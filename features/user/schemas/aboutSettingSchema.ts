import { z } from "zod";

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
  telegram: z
    .string()
    .transform((val) => val.trim())
    .optional()
    .refine(
      (val) => !val || val.trim().length === 0 || !/^\d+$/.test(val.trim()),
      {
        message: "شناسه تلگرام نمی‌تواند فقط شامل اعداد باشد",
      }
    )
    .refine((val) => !val || !/[\u0600-\u06FF]/.test(val.trim()), {
      message: "شناسه تلگرام نمی‌تواند شامل حروف فارسی باشد",
    })
    .refine((val) => !val || val.trim().length > 0, {
      message: "شناسه تلگرام نمی‌تواند خالی باشد",
    }),

  // همین الگو رو برای instagram, linkedin, twitter, github تکرار کن...
  instagram: z
    .string()
    .transform((val) => val.trim())
    .optional()
    .refine(
      (val) => !val || val.trim().length === 0 || !/^\d+$/.test(val.trim()),
      {
        message: "شناسه اینستاگرام نمی‌تواند فقط شامل اعداد باشد",
      }
    )
    .refine((val) => !val || !/[\u0600-\u06FF]/.test(val.trim()), {
      message: "شناسه اینستاگرام نمی‌تواند شامل حروف فارسی باشد",
    })
    .refine((val) => !val || val.trim().length > 0, {
      message: "شناسه اینستاگرام نمی‌تواند خالی باشد",
    }),

  linkedin: z
    .string()
    .transform((val) => val.trim())
    .optional()
    .refine(
      (val) => !val || val.trim().length === 0 || !/^\d+$/.test(val.trim()),
      {
        message: "شناسه لینکدین نمی‌تواند فقط شامل اعداد باشد",
      }
    )
    .refine((val) => !val || !/[\u0600-\u06FF]/.test(val.trim()), {
      message: "شناسه لینکدین نمی‌تواند شامل حروف فارسی باشد",
    })
    .refine((val) => !val || val.trim().length > 0, {
      message: "شناسه لینکدین نمی‌تواند خالی باشد",
    }),

  twitter: z
    .string()
    .transform((val) => val.trim())
    .optional()
    .refine(
      (val) => !val || val.trim().length === 0 || !/^\d+$/.test(val.trim()),
      {
        message: "شناسه توییتر نمی‌تواند فقط شامل اعداد باشد",
      }
    )
    .refine((val) => !val || !/[\u0600-\u06FF]/.test(val.trim()), {
      message: "شناسه توییتر نمی‌تواند شامل حروف فارسی باشد",
    })
    .refine((val) => !val || val.trim().length > 0, {
      message: "شناسه توییتر نمی‌تواند خالی باشد",
    }),

  github: z
    .string()
    .transform((val) => val.trim())
    .optional()
    .refine(
      (val) => !val || val.trim().length === 0 || !/^\d+$/.test(val.trim()),
      {
        message: "شناسه گیتهاب نمی‌تواند فقط شامل اعداد باشد",
      }
    )
    .refine((val) => !val || !/[\u0600-\u06FF]/.test(val.trim()), {
      message: "شناسه گیتهاب نمی‌تواند شامل حروف فارسی باشد",
    })
    .refine((val) => !val || val.trim().length > 0, {
      message: "شناسه گیتهاب نمی‌تواند خالی باشد",
    }),
});

export type ProfileInfoFormData = z.infer<typeof profileInfoSchema>;

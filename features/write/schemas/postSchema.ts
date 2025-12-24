import { z } from "zod";

export const postSchema = z
  .object({
    title: z
      .string()
      .min(5, "عنوان باید حداقل شامل ۵ کاراکتر باشه ")
      .max(60, "حداکثر ۶۰ کاراکتر برای عنوان بلاگ مجازه"),
    summary: z
      .string()
      .min(10, "متن توضیحات مختصر بلاگ باید حداقل شامل ۱۰ کاراکتر باشه")
      .max(150, "حداکثر ۱۵۰ کاراکتر برای خلاصه بلاگ مجازه"),
    banner_image: z.string().min(1, "لطفا یک عکس برای بنر بلاگ انتخاب کن"),
    content: z.string().min(50, "محتوا خیلی کوتاهه"),
    visibility: z.enum(["PUBLIC", "PRIVATE", "DRAFT", "SCHEDULED"], {
      error: "لطفا یک وضعیت انتشار (عمومی | خصوصی | پیش نویس)  انتخاب کن",
    }),
    published_at: z.iso.datetime().nullable(),
    tags: z
      .array(z.object({ id: z.number(), title: z.string() }))
      .min(1, "حداقل ۱ تگ انتخاب کن")
      .max(3, "حداکثر ۳ تگ میتونی انتخاب کنی"),
  })
  .refine(
    (data) => {
      if (data.visibility === "SCHEDULED") {
        return data.published_at !== null;
      }
      return true;
    },
    {
      message: "برای انتشار زمان‌دار باید تاریخ انتخاب کنی",
      path: ["published_at"],
    }
  );

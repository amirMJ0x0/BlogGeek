"use server";

import { revalidateTag } from "next/cache";

export const revalidateBlogDetail = async (blogId: number) => {
  await revalidateTag(`blog-detail-${blogId}`, "");
};



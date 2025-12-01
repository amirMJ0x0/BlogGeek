"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Blog } from "../blogTypes";
import { useEffect } from "react";

const BlogReviews = ({ blog }: { blog: Blog }) => {
  useEffect(() => {
    const hash = window.location.hash;

    if (hash === "#reviews") {
      // یک تأخیر برای اینکه DOM کامل ساخته بشه
      setTimeout(() => {
        const el = document.getElementById("reviews");
        if (el) el.scrollIntoView({ behavior: "smooth" });

        // بعد از اسکرول، hash رو حذف کن
        history.replaceState(null, "", window.location.pathname);
      }, 100); // ← همین 100ms باعث میشه همیشه درست کار کنه
    }
  }, []);

  return (
    <section className="mt-4 pt-4 h-screen" id="reviews">
      <div className="">
        <h3 className="font-bold text-lg">پاسخ ها (۱۲)</h3>
      </div>
      <div className="flex gap-2 items-center mt-4">
        <Avatar>
          <AvatarImage src={blog.author?.profile_image!} />
          <AvatarFallback className="bg-secondary-light dark:bg-secondary-dark dark:!brightness-150">
            {blog.author?.first_name
              ? blog.author?.first_name?.substring(0, 1)
              : blog.author?.username?.substring(0, 1)}
          </AvatarFallback>
        </Avatar>

        <h4 className="font-light">
          {blog.author?.first_name || blog.author?.last_name
            ? `${blog.author?.first_name ?? ""} ${
                blog.author?.last_name ?? ""
              }`.trim()
            : blog.author.username}
        </h4>
      </div>
      {/* <div className="w-full h-10 rounded-sm bg-secondary-light mt-3 flex justify-start items-center pr-3 hover:cursor-text">
          <p className="text-sm text-secondary-dark">نظر خود را درمورد این پست بنویسید</p>
        </div> */}
      <Textarea
        className="mt-4 min-h-10 max-h-10 focus:min-h-27 focus:max-h-27 resize-none bg-secondary-light text-secondary-dark transition-all ease-in-out"
        placeholder="نظر خود را درمورد این پست بنویسید"
      />
    </section>
  );
};

export default BlogReviews;

"use client";

import { useEffect, useRef } from "react";
import { viewPost } from "../api/viewPost";
import { AxiosError } from "axios";

const HiddenViewElement = ({ id }: { id: number }) => {
  const hasViewPosted = useRef(false);
  useEffect(() => {
    if (hasViewPosted.current) {
      return;
    }
    const postView = async () => {
      hasViewPosted.current = true;
      try {
        const response = await viewPost(id);

        if (response.data.statusCode === 200) {
          console.log("بازدید با موفقیت ثبت شد.");
        }
      } catch (error) {
        const err = error as AxiosError<any>;

        const status = err.response?.status;

        if (err.response && status === 400) {
          // console.log("بازدید قبلاً برای این کاربر ثبت شده است.");
        } else {
          console.error("خطا در ثبت بازدید:", error);
        }
      }
    };
    postView();
  }, [id]);

  return <div className="hidden"></div>;
};

export default HiddenViewElement;

import { toast, Bounce } from "react-toastify";
import { useTheme } from "next-themes";
import React from "react";
import { useIsMobile } from "@/hooks/use-mobile";

export const useCustomToast = () => {
  const { theme, systemTheme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;
  const isMobile = useIsMobile();
  const baseOptions = {
    position: isMobile ? ("top-left" as const) : ("top-right" as const),
    autoClose: 4000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: currentTheme === "dark" ? "dark" : "light",
    transition: Bounce,
    rtl: true,
    style: {
      maxWidth: "500px",
      width: "fit-content",
    },
  };

  const showToast = (
    message: string | React.ReactNode,
    type: "success" | "error" | "info" = "info",
    className: string = "custom-toast"
  ) => {
    const opts = { ...baseOptions, className };

    const toastFn =
      type === "success"
        ? toast.success
        : type === "error"
        ? toast.error
        : toast.info;

    toastFn(message, opts);
  };

  return { showToast };
};

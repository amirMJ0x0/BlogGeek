import { toast, Bounce } from "react-toastify";
import { useTheme } from "next-themes";

export const useCustomToast = () => {
  const { theme, systemTheme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;

  const showToast = (
    message: string,
    type: "success" | "error" | "info" = "info",
    className?: string
  ) => {
    const baseOptions = {
      position: "top-right" as const,
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: currentTheme === "dark" ? "dark" : "light",
      transition: Bounce,
      rtl: true,
      className,
    };

    switch (type) {
      case "success":
        toast.success(message, baseOptions);
        break;
      case "error":
        toast.error(message, baseOptions);
        break;
      case "info":
      default:
        toast.info(message, baseOptions);
        break;
    }
  };

  return { showToast };
};

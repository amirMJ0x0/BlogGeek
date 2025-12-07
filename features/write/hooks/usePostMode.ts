import { usePathname } from "next/navigation";

export const usePostMode = () => {
  const path = usePathname();

  const isEdit = path.includes("/edit-post/");
  const mode = isEdit ? "edit" : "create";

  const id = isEdit ? path.split("/").pop() : null;

  return { mode, id };
};

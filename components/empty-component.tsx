import { FolderOpen } from "lucide-react";
import { ReactNode } from "react";

type props = {
  message?: string;
  icon?: ReactNode;
};

const EmptyComponent = ({ message, icon }: props) => {
  return (
    <div className="flex flex-col justify-center h-48 items-center p-6 gap-2 text-center text-gray-500">
      {icon ? icon : <FolderOpen className="size-10" />}
      {message ? message : "پستی وجود ندارد"}
    </div>
  );
};

export default EmptyComponent;

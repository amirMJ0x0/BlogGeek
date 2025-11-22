"use client";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  CircleAlert,
  HandHeart,
  Info,
  Logs,
  MessageCircleMore,
  MonitorCog,
  UserRoundPlus,
} from "lucide-react";
import { useEffect, useState } from "react";
import { NotificationType } from "../navTypes";

const iconMap: Record<string, React.ReactNode> = {
  ALL: <Logs className="h-4 w-4" />,
  SYSTEM: <MonitorCog className="h-4 w-4" />,
  FOLLOWING: <UserRoundPlus className="h-4 w-4" />,
  LIKE: <HandHeart className="h-4 w-4" />,
  INFO: <Info className="h-4 w-4" />,
  WARNING: <CircleAlert className="h-4 w-4" />,
  COMMENT: <MessageCircleMore className="h-4 w-4" />,
};

const NotificationTypeFilter = ({
  setFilterType,
}: {
  setFilterType: (v: NotificationType) => void;
}) => {
  const [selected, setSelected] = useState<NotificationType>("ALL");

  useEffect(() => {
    setFilterType(selected);
  }, [selected]);

  return (
    <Select
      value={selected}
      onValueChange={(v: NotificationType) => setSelected(v)}
    >
      <SelectTrigger defaultValue={"ALL"} size="sm" className="max-w-30 px-2">
        <SelectValue placeholder={iconMap["ALL"]}>
          {selected ? iconMap[selected] : null}
        </SelectValue>
      </SelectTrigger>
      <SelectContent align="center" className="">
        <SelectGroup className="">
          <SelectLabel>دسته بندی</SelectLabel>
          <SelectItem value="ALL">
            <Logs />
            همه
          </SelectItem>
          <SelectItem value="SYSTEM">
            <MonitorCog />
            سیستمی
          </SelectItem>
          <SelectItem value="FOLLOWING">
            <UserRoundPlus />
            دنبال کردن
          </SelectItem>
          <SelectItem value="LIKE">
            <HandHeart />
            لایک ها
          </SelectItem>
          <SelectItem value="INFO">
            <Info />
            اطلاعات
          </SelectItem>
          <SelectItem value="WARNING">
            <CircleAlert />
            هشدار
          </SelectItem>
          <SelectItem value="COMMENT">
            <MessageCircleMore />
            کامنت
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default NotificationTypeFilter;

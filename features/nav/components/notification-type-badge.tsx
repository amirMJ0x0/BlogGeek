"use client";
import { Badge } from "@/components/ui/badge";
import { NotificationType } from "../navTypes";
import { cn } from "@/lib/utils";
import { ReactElement } from "react";
import {
  CircleAlert,
  HandHeart,
  Info,
  MessageCircleMore,
  MonitorCog,
  UserRoundPlus,
} from "lucide-react";

const typeStyles: Record<
  NotificationType,
  { className: string; icon: ReactElement }
> = {
  // Styles for 'LIKE' notifications (e.g., Red for likes)
  LIKE: { className: "bg-red-500 text-white", icon: <HandHeart /> },

  // Styles for 'COMMENT' notifications (e.g., Blue for comments)
  COMMENT: { className: "bg-blue-500 text-white", icon: <MessageCircleMore /> },

  // Styles for 'FOLLOWING' notifications (e.g., Green for new followers)
  FOLLOWING: { className: "bg-green-500 text-white", icon: <UserRoundPlus /> },

  // Styles for 'INFO' notifications (e.g., Sky blue for general information)
  INFO: { className: "bg-sky-500 text-white", icon: <Info /> },

  // Styles for 'WARNING' notifications (e.g., Yellow/Orange for warnings)
  WARNING: { className: "bg-orange-500 text-white", icon: <CircleAlert /> },

  // Styles for 'SYSTEM' notifications (e.g., Gray/Dark for system messages)
  SYSTEM: { className: "bg-gray-500 text-white", icon: <MonitorCog /> },
};

const NotificationTypeBadge = ({ type }: { type: NotificationType }) => {
  const colorClasses = typeStyles[type].className;

  return (
    <Badge
      className={cn(
        `max-h-5.5 max-w-8 !text-[10px] uppercase font-bold px-1.5 py-0.5 mb-0.5 rounded-full`,
        colorClasses
      )}
    >
      {typeStyles[type].icon}
    </Badge>
  );
};

export default NotificationTypeBadge;

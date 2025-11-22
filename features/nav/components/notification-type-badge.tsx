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

const typeStyles: Record<string, { className: string; icon: ReactElement }> = {
  // Styles for 'LIKE' notifications (e.g., Red for likes)
  LIKE: {
    className:
      "bg-red-100 text-pink-500 dark:bg-red-900 dark:text-pink-200  size-10 ",
    icon: <HandHeart className="!size-5" />,
  },

  // Styles for 'COMMENT' notifications (e.g., Blue for comments)
  COMMENT: {
    className:
      "bg-indigo-100 text-indigo-500 dark:bg-indigo-900 dark:text-indigo-100 size-10",
    icon: <MessageCircleMore className="!size-4" />,
  },

  // Styles for 'FOLLOWING' notifications (e.g., Green for new followers)
  FOLLOWING: {
    className:
      "bg-green-100 text-green-500 dark:bg-green-900 dark:text-green-200 size-10",
    icon: <UserRoundPlus className="!size-4" />,
  },

  // Styles for 'INFO' notifications (e.g., Sky blue for general information)
  INFO: {
    className:
      "bg-sky-100 text-blue-500 size-10 dark:bg-sky-900 dark:text-blue-200",
    icon: <Info className="!size-4" />,
  },

  // Styles for 'WARNING' notifications (e.g., Yellow/Orange for warnings)
  WARNING: {
    className:
      "bg-orange-100 text-orange-500 dark:bg-orange-900 dark:text-orange-200 size-10",
    icon: <CircleAlert className="!size-4" />,
  },

  // Styles for 'SYSTEM' notifications (e.g., Gray/Dark for system messages)
  SYSTEM: {
    className:
      "bg-gray-100 text-gray-500 dark:bg-gray-900 dark:text-gray-200 size-10",
    icon: <MonitorCog className="!size-4" />,
  },
};

const NotificationTypeBadge = ({ type }: { type: NotificationType }) => {
  const colorClasses = typeStyles[type].className;

  return (
    <Badge
      className={cn(
        ` uppercase font-bold px-1.5 py-0.5 mb-0.5 rounded-full`,
        colorClasses
      )}
    >
      {typeStyles[type].icon}
    </Badge>
  );
};

export default NotificationTypeBadge;

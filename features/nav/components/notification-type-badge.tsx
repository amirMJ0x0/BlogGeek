"use client";
import { Badge } from "@/components/ui/badge";
import { NotificationType } from "../navTypes";
import { cn } from "@/lib/utils";

const typeStyles: Record<NotificationType, string> = {
  // Styles for 'LIKE' notifications (e.g., Red for likes)
  LIKE: "bg-red-500 text-white",

  // Styles for 'COMMENT' notifications (e.g., Blue for comments)
  COMMENT: "bg-blue-500 text-white",

  // Styles for 'FOLLOWING' notifications (e.g., Green for new followers)
  FOLLOWING: "bg-green-500 text-white",

  // Styles for 'INFO' notifications (e.g., Sky blue for general information)
  INFO: "bg-sky-500 text-white",

  // Styles for 'WARNING' notifications (e.g., Yellow/Orange for warnings)
  WARNING: "bg-orange-500 text-white",

  // Styles for 'SYSTEM' notifications (e.g., Gray/Dark for system messages)
  SYSTEM: "bg-gray-500 text-white",
};

const NotificationTypeBadge = ({ type }: { type: NotificationType }) => {
  const colorClasses = typeStyles[type];

  return (
    <Badge
      className={cn(
        `max-h-4.5 max-w-8 !text-[8px] uppercase font-bold px-1.5 py-0.5 rounded-full`,
        colorClasses
      )}
    >
      {type}
    </Badge>
  );
};

export default NotificationTypeBadge;

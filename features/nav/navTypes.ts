export const NOTIF_PAGE_LIMIT = 10;

export type NotificationType =
  | "LIKE"
  | "COMMENT"
  | "FOLLOWING"
  | "INFO"
  | "WARNING"
  | "SYSTEM"
  | "ALL";

export type NotificationItem = {
  id: number;
  title: string;
  content: string;
  href: string | null;
  read_at: string | null;
  notificationType: NotificationType;
  read: boolean;
  createdAt: string;
};

export type NotificationsResponse = {
  notifications: NotificationItem[];
  totalUnread: number;
};

export type ReadNotifications = {
  notification_id: number | null;
};

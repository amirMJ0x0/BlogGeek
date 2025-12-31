import api from "@/lib/client/api";
import { ApiResponse } from "@/types";
import { NOTIF_PAGE_LIMIT, NotificationsResponse } from "../navTypes";

export const fetchNotifications = async ({ pageParam = 1 }) => {
  const { data } = await api.get<ApiResponse<NotificationsResponse>>(
    "/v1/notification",
    {
      params: {
        page: pageParam,
        limit: NOTIF_PAGE_LIMIT,
      },
    }
  );
  return data.data; // {notifications:[...],totalUnread}
};

import api from "@/lib/client/api";
import { ApiResponse } from "@/types";
import { ReadNotifications } from "../navTypes";

export const readNotifications = async ({
  notification_id = null,
}: ReadNotifications) => {
  await api.post<ApiResponse<null>>("/v1/notification/read", {
    notification_id,
  });
};

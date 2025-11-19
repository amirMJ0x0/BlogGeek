import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchNotifications } from "../api/getNotifications";
import { NOTIF_PAGE_LIMIT } from "../navTypes";

export const useInfiniteNotifications = () => {
  return useInfiniteQuery({
    queryKey: ["notifications"],
    queryFn: fetchNotifications,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      // lastPage contains fetchNotifications's output
      const fetchedCount = lastPage?.notifications.length!;

      // If notifications items > 10 it means this is the lastPage
      if (fetchedCount < NOTIF_PAGE_LIMIT) {
        return undefined;
      }

      // Otherwise nextPage will be :
      return allPages.length + 1;
    },
  });
};

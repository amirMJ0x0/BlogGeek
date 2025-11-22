"use client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { Bell, CheckCheck } from "lucide-react";
import Link from "next/link";
import { useInfiniteNotifications } from "../hooks/useInfiniteNotifications";
import { useCallback, useRef, useState } from "react";
import { Spinner } from "@/components/ui/spinner";
import NotificationTypeBadge from "./notification-type-badge";
import { NotificationType } from "../navTypes";
import { useUserStore } from "@/features/user/store/useUserStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { readNotifications } from "../api/readNotifications";
import NotificationTypeFilter from "./notif-type-filter";

const Notifications = () => {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const { isAuthenticated } = useUserStore();
  const queryClient = useQueryClient();
  const [filterType, setFilterType] = useState<NotificationType>("ALL");
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useInfiniteNotifications();

  const { mutate: readNotification } = useMutation({
    mutationFn: readNotifications,
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });
  // Observer Logic
  const observer = useRef<IntersectionObserver | null>(null);

  const lastNotificationRef = useCallback(
    (node: HTMLLIElement) => {
      if (isFetchingNextPage) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && hasNextPage) {
            fetchNextPage();
          }
        },
        {
          threshold: 0.2,
        }
      );

      if (node) observer.current.observe(node);
    },
    [isFetchingNextPage, hasNextPage, fetchNextPage]
  );

  const markAllAsRead = async () => {
    readNotification({
      notification_id: null,
    });
  };

  const notifications =
    data?.pages.flatMap((page) => page?.notifications) ?? [];

  const filteredNotifications =
    filterType === "ALL"
      ? notifications
      : notifications.filter((notif) => notif?.notificationType === filterType);

  const totalUnreadCount = data?.pages[0]?.totalUnread ?? 0;
  return isAuthenticated ? (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          className="relative"
          variant={"outline"}
          size={"icon"}
          disabled={isError || isLoading}
          title="notifications"
        >
          {totalUnreadCount > 0 && (
            <Badge
              variant={"default"}
              className="text-[13px] pt-1 absolute -top-1 -right-1 size-5"
            >
              {totalUnreadCount}
            </Badge>
          )}
          <Bell className="size-5" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-84 ml-5 overscroll-contain space-y-3 dark:bg-primary-dark !shadow-lg">
        <div className="flex justify-between items-center">
          <h3 className="leading-none font-bold text-xl flex gap-2">
            <span> اعلان ها </span>
            {/* {totalUnreadCount > 0 && (
              <Badge className="">{totalUnreadCount}</Badge>
            )} */}
          </h3>
          <div className="flex gap-1">
            <Button
              variant={"outline"}
              size={"sm"}
              className="!text-sm"
              onClick={markAllAsRead}
            >
              همه خوانده شد <CheckCheck />
            </Button>
            <NotificationTypeFilter setFilterType={setFilterType} />
          </div>
        </div>
        <Separator />
        <div
          className="max-h-96 overflow-y-auto flex flex-col gap-2 pr-1 overscroll-contain"
          ref={scrollContainerRef}
        >
          {filteredNotifications.length === 0 ? (
            <p className="p-4 text-center text-gray-500">اعلانی وجود ندارد</p>
          ) : (
            <ul className="divide-y">
              {filteredNotifications.map((notif, index) => {
                const isLastItem = index === filteredNotifications.length - 1;

                return (
                  <li
                    key={`${notif?.id}-${index}`}
                    ref={isLastItem ? lastNotificationRef : null}
                    className={`relative bg-secondary-light dark:bg-secondary-dark py-2 px-3 my-2 rounded-sm transition ease-in-out hover:!scale-95 ${
                      !notif?.read
                        ? "bg-secondary-light/50 dark:bg-secondary-dark/50"
                        : ""
                    }`}
                  >
                    <div className="flex gap-2 items-center">
                      <NotificationTypeBadge
                        type={notif?.notificationType as NotificationType}
                      />
                      <Link
                        href={notif?.href ?? "#"}
                        className="flex gap-2 items-center"
                      >
                        <h4 className="text-md font-semibold">
                          {notif?.title}
                        </h4>
                      </Link>
                      <Separator orientation="vertical" className="!h-5" />
                      <span className="text-[10px]" dir="ltr">
                        {new Date(notif?.createdAt!).toLocaleString("fa-IR")}
                      </span>
                    </div>

                    <p className="text-xs text-gray-600 mt-1">
                      {notif?.content}
                    </p>

                    <span className="text-gray-600 absolute bottom-1 left-1">
                      {notif?.read && <CheckCheck size={"1rem"} />}
                    </span>
                  </li>
                );
              })}
            </ul>
          )}
          {/* Loading Indicator for Next Page */}
          {isFetchingNextPage && (
            <div className="p-2 text-center flex justify-center text-xs text-gray-500">
              <Spinner />
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  ) : null;
};

export default Notifications;

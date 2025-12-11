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
import { useRouter } from "next/navigation";

const Notifications = () => {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const { isAuthenticated } = useUserStore();
  const queryClient = useQueryClient();
  const [filterType, setFilterType] = useState<NotificationType>("ALL");
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useInfiniteNotifications(open);

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

  const handleClick = (href: string) => {
    href ? router.push(href) : null;
  };

  return isAuthenticated ? (
    <Popover open={open} onOpenChange={setOpen}>
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
      <PopoverContent
        align="center"
        className="scroll-bar-cs w-96 ml-1 md:ml-5 overscroll-contain space-y-3 dark:bg-primary-dark !shadow-lg "
      >
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
                    onClick={() => handleClick(notif?.href || "")}
                    className={`relative border-b-0 border-t first:border-none border-slate-100 dark:border-slate-700 py-2 px-1 my-2  transition ease-in-out cursor-pointer`}
                  >
                    <div className="flex items-center gap-2 w-full">
                      <NotificationTypeBadge
                        type={notif?.notificationType as NotificationType}
                      />
                      <div className="flex flex-col gap-1 items-start justify-center w-full">
                        <div className="flex justify-between items-center gap-2 w-full">
                          <div className="flex gap-2 items-center">
                            <h4 className="text-md font-semibold whitespace-nowrap">
                              {notif?.title}
                            </h4>
                          </div>
                          {/* <Separator orientation="vertical" className="!h-5" /> */}
                          <span
                            className="text-[9px] bg-slate-100 px-2 py-0.5 rounded-lg dark:bg-slate-800 dark:text-slate-100"
                            dir="ltr"
                          >
                            {new Date(notif?.createdAt!).toLocaleString(
                              "fa-IR"
                            )}
                          </span>
                        </div>
                        <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 leading-5 max-w-[90%]">
                          {notif?.content}
                        </p>
                      </div>
                    </div>

                    <span
                      className="text-gray-600 absolute bottom-1 left-1"
                      title={new Date(notif?.read_at as string).toLocaleString(
                        "fa-IR"
                      )}
                    >
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

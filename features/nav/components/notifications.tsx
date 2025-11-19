"use client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { Bell } from "lucide-react";
import Link from "next/link";
import { useInfiniteNotifications } from "../hooks/useInfiniteNotifications";
import { useCallback, useEffect, useRef } from "react";
import { Spinner } from "@/components/ui/spinner";
import NotificationTypeBadge from "./notification-type-badge";
import { NotificationType } from "../navTypes";
const Notifications = () => {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useInfiniteNotifications();

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

  if (isLoading)
    return (
      <div className="p-4 text-center">
        <Spinner />
      </div>
    );
  if (isError)
    return <div className="p-4 text-red-500">خطا در دریافت اعلان‌ها</div>;

  const notifications =
    data?.pages.flatMap((page) => page?.notifications) ?? [];

  const totalUnreadCount = data?.pages[0]?.totalUnread ?? 0;
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="relative" variant={"link"}>
          <Badge variant={"default"} className="absolute top-0 right-1 size-5">
            {totalUnreadCount}
          </Badge>
          <Bell className="size-6" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="space-y-3 dark:bg-primary-dark">
        <h3 className="leading-none font-bold text-xl pb-3">
          اعلان ها <Badge>{data?.pages[0]!.totalUnread}</Badge>
        </h3>
        <Separator />
        <div
          className="max-h-96 overflow-y-auto flex flex-col gap-2 pr-1"
          ref={scrollContainerRef}
        >
          {notifications.length === 0 ? (
            <p className="p-4 text-center text-gray-500">اعلانی وجود ندارد</p>
          ) : (
            <ul className="divide-y ">
              {notifications.map((notif, index) => {
                const isLastItem = index === notifications.length - 1;

                return (
                  <li
                    key={`${notif?.id}-${index}`}
                    ref={isLastItem ? lastNotificationRef : null}
                    className={`bg-secondary-light dark:bg-secondary-dark py-2 px-3 my-2 rounded-sm transition ease-in-out hover:!scale-95 ${
                      !notif?.read
                        ? "bg-secondary-light/50 dark:bg-secondary-dark/50"
                        : ""
                    }`}
                  >
                    <Link
                      href={notif?.href ?? "#"}
                      className="flex gap-2 items-center"
                    >
                      <h4 className="text-md font-semibold">{notif?.title}</h4>
                      <Separator orientation="vertical" className="!h-5" />
                      <span className="text-[10px]">
                        {new Date(notif?.createdAt!).toLocaleDateString(
                          "fa-IR"
                        )}
                      </span>
                      <Separator orientation="vertical" className="!h-5" />
                      <NotificationTypeBadge
                        type={notif?.notificationType as NotificationType}
                      />
                    </Link>

                    <p className="text-xs text-gray-600 mt-1">
                      {notif?.content}
                    </p>
                    <div className=" text-gray-400 mt-2 flex justify-around"></div>
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
  );
};

export default Notifications;

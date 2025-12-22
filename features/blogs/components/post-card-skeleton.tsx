import { Skeleton } from "@/components/ui/skeleton";

export function PostCardSkeleton() {
  return (
    <div className="rounded-xl border p-4 shadow-sm mb-3">
      <div className="flex justify-between mb-4 md:mb-6">
        <div className="space-y-2 w-full">
          <div className="flex items-center gap-3">
            <Skeleton className="h-10 w-10 rounded-full" />
            <Skeleton className="h-4 w-1/3 sm:w-1/4" />
            {/* <Skeleton className="h-3 w-1/4" /> */}
          </div>
          <div className="w-full flex flex-col gap-3">
            <Skeleton className="h-5 sm:h-6 w-2/3 sm:w-1/2" />
            <Skeleton className="h-3 w-11/12 sm:w-3/4" />
            <Skeleton className="h-3 w-7/12 sm:w-2/3" />
          </div>
        </div>
        <Skeleton className="w-[40%] max-sm:h-24 mt-8 md:mt-4" />
      </div>

      <div className="flex justify-between items-center pt-2">
        <div className="flex gap-3">
          <Skeleton className="h-4 w-12 sm:h-5 sm:w-20 rounded-full" />
          <Skeleton className="h-4 w-14 sm:h-5 sm:w-16 rounded-full" />
          <Skeleton className="max-sm:hidden h-5 w-14 rounded-full" />
        </div>

        <div className="flex gap-4">
          <Skeleton className="w-5 h-4 sm:h-6 sm:w-8" />
          <Skeleton className="w-5 h-4 sm:h-6 sm:w-8" />
          <Skeleton className="w-5 h-4 sm:h-6 sm:w-8" />
        </div>
      </div>
    </div>
  );
}

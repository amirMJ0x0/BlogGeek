"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRouter, useSearchParams } from "next/navigation";
import SavedPostsSection from "./saved-posts";
import LikedPostsSection from "./liked-posts";
import { FolderOpen } from "lucide-react";

type ProfileTabsProps = {
  isOwner: boolean;
};
const ProfileTabs = ({ isOwner }: ProfileTabsProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentTab = searchParams.get("tab") || "posts";

  const handleTabChange = (value: string) => {
    router.replace(`?tab=${value}`, { scroll: false });
  };

  return (
    <Tabs
      defaultValue={currentTab}
      onValueChange={handleTabChange}
      className="w-full"
    >
      <TabsList className="w-full bg-secondary-light">
        <TabsTrigger value="posts">پست‌ها</TabsTrigger>

        {isOwner && (
          <>
            <TabsTrigger value="favorites">علاقه‌مندی‌ها</TabsTrigger>
            <TabsTrigger value="bookmarks">نشان‌ها</TabsTrigger>
          </>
        )}
      </TabsList>

      <TabsContent value="posts">
        <div className="flex flex-col justify-center h-48 items-center p-6 gap-2 text-center text-gray-500">
          <FolderOpen className="size-10" />
          پستی وجود ندارد
        </div>
      </TabsContent>

      {isOwner && (
        <>
          <TabsContent value="favorites">
            <LikedPostsSection />
          </TabsContent>
          <TabsContent value="bookmarks">
            <SavedPostsSection />
          </TabsContent>
        </>
      )}
    </Tabs>
  );
};

export default ProfileTabs;

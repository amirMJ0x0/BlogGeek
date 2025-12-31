"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MyCommentsSection from "@/features/comments/components/my-comments";
import { useRouter, useSearchParams } from "next/navigation";
import LikedPostsSection from "./liked-posts";
import UserBlogs from "./user-blogs";
import SavedPostsSection from "./saved-posts";

type ProfileTabsProps = {
  isOwner: boolean;
  username: string;
};
const ProfileTabs = ({ isOwner, username }: ProfileTabsProps) => {
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
      className="w-full mb-4"
    >
      <TabsList className="w-full bg-secondary-light">
        <TabsTrigger value="posts">پست‌ها</TabsTrigger>

        {isOwner && (
          <>
            <TabsTrigger value="favorites">علاقه‌مندی‌ها</TabsTrigger>
            <TabsTrigger value="bookmarks">نشان‌ها</TabsTrigger>
            <TabsTrigger value="my-comments">نظر های من</TabsTrigger>
          </>
        )}
      </TabsList>

      <TabsContent value="posts">
        <UserBlogs username={username} />
      </TabsContent>

      {isOwner && (
        <>
          <TabsContent value="favorites">
            <LikedPostsSection />
          </TabsContent>
          <TabsContent value="bookmarks">
            <SavedPostsSection />
          </TabsContent>
          <TabsContent value="my-comments">
            <MyCommentsSection />
          </TabsContent>
        </>
      )}
    </Tabs>
  );
};

export default ProfileTabs;

"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRouter, useSearchParams } from "next/navigation";

const ProfileTabs = () => {
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
      <TabsList className="w-full">
        <TabsTrigger value="posts">پست ها</TabsTrigger>
        <TabsTrigger value="favorites">علاقه مندی ها</TabsTrigger>
        <TabsTrigger value="bookmarks">نشان ها</TabsTrigger>
      </TabsList>
      <TabsContent value="posts">پست ها</TabsContent>
      <TabsContent value="favorites">علاقه مندیا</TabsContent>
      <TabsContent value="bookmarks">نشان ها</TabsContent>
    </Tabs>
  );
};

export default ProfileTabs;

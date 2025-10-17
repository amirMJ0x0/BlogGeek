"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRouter, useSearchParams } from "next/navigation";
import SettingAboutSection from "./setting-about-section";

const SettingsTabs = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentTab = searchParams.get("tab") || "about-me";

  const handleTabChange = (value: string) => {
    router.replace(`?tab=${value}`, { scroll: false });
  };

  return (
    <Tabs
      defaultValue={currentTab}
      onValueChange={handleTabChange}
      className="w-full"
    >
      <TabsList className="w-full" dir="rtl">
        <TabsTrigger value="about-me">درباره شما</TabsTrigger>
        <TabsTrigger value="account">حساب کاربری</TabsTrigger>
        <TabsTrigger value="others">سایر...</TabsTrigger>
      </TabsList>
      <TabsContent value="about-me">
        <SettingAboutSection />
      </TabsContent>
      <TabsContent value="account">account</TabsContent>
      <TabsContent value="others">others</TabsContent>
    </Tabs>
  );
};

export default SettingsTabs;

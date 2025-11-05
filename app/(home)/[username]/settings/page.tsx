import { Spinner } from "@/components/ui/spinner";
import SettingsTabs from "@/features/user/components/profile-setting/settings-tabs";

import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "تنظیمات حساب کاربری",
  description: "تنظیمات حساب کاربری (اطلاعات فردی و حساب کاربری و ...)",
};

const Settings = () => {
  return (
    <section className="flex flex-col items-start gap-5">
      <h1 className="text-2xl font-bold">تنظیمات حساب کاربری</h1>
      <Suspense fallback={<Spinner className="size-6" />}>
        <SettingsTabs />
      </Suspense>
    </section>
  );
};

export default Settings;

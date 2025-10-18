import { Spinner } from "@/components/ui/spinner";
import { SpinnerButton } from "@/components/ui/spinner-button";
import SettingsTabs from "@/features/user/components/settings-tabs";
import { Suspense } from "react";

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

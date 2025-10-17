import SettingsTabs from "@/features/user/components/settings-tabs";

const Settings = () => {
  return (
    <section className="flex flex-col items-start gap-5">
      <h1 className="text-2xl font-bold">تنظیمات حساب کاربری</h1>
      <SettingsTabs />
    </section>
  );
};

export default Settings;

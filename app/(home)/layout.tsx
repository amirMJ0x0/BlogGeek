import DesktopNav from "@/features/nav/components/desktop-navs";
import Header from "@/features/nav/components/header";
import MobileNav from "@/features/nav/components/mobile-navs";
import SideBar from "@/features/sidebar/components/sidebar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="flex flex-col md:flex-row gap-6 p-4 md:p-6 lg:px-8">
        <aside className="max-lg:hidden w-1/6 bg-white dark:bg-secondary-dark rounded-2xl p-2 !shadow-sm border-gray-100 max-h-min sticky right-0 top-5">
          <DesktopNav />
        </aside>

        <div className="flex-1 text-center p-2 md:p-4 lg:p-6 !shadow-sm bg-white dark:!bg-secondary-dark rounded-2xl border-gray-200 border-1 dark:border-0">
          {children}
        </div>

        <SideBar />
      </main>

      <MobileNav />
    </>
  );
}

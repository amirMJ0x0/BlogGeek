import { Separator } from "@/components/ui/separator";
import DesktopNav from "@/features/nav/components/desktop-navs";
import Header from "@/features/nav/components/header";
import MobileNav from "@/features/nav/components/mobile-navs";
import SideBar from "@/features/sidebar/components/sidebar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="flex flex-col md:flex-row gap-6 p-4 md:p-6 lg:px-8">
        <div className="max-lg:hidden w-1/6 bg-white dark:bg-[#222831] rounded-2xl p-2 !shadow-sm border-gray-100">
          <DesktopNav />
        </div>

        <div className="flex-1 text-center p-2 md:p-4 lg:p-6 shadow-md bg-white dark:!bg-[#222831]/70 rounded-2xl">
          {children}
        </div>

        <SideBar />
      </main>

      <MobileNav />
    </>
  );
}

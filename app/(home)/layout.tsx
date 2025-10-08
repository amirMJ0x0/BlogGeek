import { Separator } from "@/components/ui/separator";
import DesktopNav from "@/features/nav/components/desktop-navs";
import Header from "@/features/nav/components/header";
import MobileNav from "@/features/nav/components/mobile-navs";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="grid grid-cols-1 md:grid-cols-[2fr_auto_1fr] lg:grid-cols-[2fr_auto_5fr_auto_2fr] gap-8 p-4 md:p-6 lg:px-8">
        <div className="max-lg:hidden">
          <DesktopNav />
        </div>
        <Separator orientation="vertical" className="max-lg:hidden" />

        <div className="text-center p-2 md:p-4 lg:p-6">{children}</div>

        <Separator orientation="vertical" className="hidden md:block" />

        <div className="max-md:hidden text-center">Sidebar</div>
      </main>

      <MobileNav />
    </>
  );
}

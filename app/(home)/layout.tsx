import Header from "@/features/header/components/header";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <div className="max-sm:px-2 sm:px-4 max-sm:pt-12 sm:pt-16">
        {children}
      </div>
    </>
  );
}

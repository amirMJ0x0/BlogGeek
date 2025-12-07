import WritePageHeader from "@/features/write/components/write-page-header";

export default function WriteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <WritePageHeader />
      <main>{children}</main>
    </>
  );
}

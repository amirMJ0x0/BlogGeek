import type { Metadata } from "next";
import { Vazirmatn } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";

const vazir = Vazirmatn({
  subsets: ["latin", "arabic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: "%s | Bloggeek",
    default: "خوش آمدید | Bloggeek",
  },
  description:
    "بلاگ‌گیک جایی برای کشف، یادگیری و به‌اشتراک‌گذاری دانسته‌هاست. از برنامه‌نویسی و تکنولوژی گرفته تا ایده‌ها و تجربه‌های شخصی، اینجا محلی برای علاقه‌مندان به دنیای علم و دانش روز است.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html dir="rtl" lang="fa-IR" className="!mx-auto min-h-[100svh]">
      <body className={`${vazir.className} antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

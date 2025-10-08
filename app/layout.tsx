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
  keywords: [
    "بلاگ",
    "بلاگ‌گیک",
    "مقالات برنامه‌نویسی",
    "یادگیری برنامه نویسی",
    "تکنولوژی",
    "وب",
    "جاوااسکریپت",
    "ری‌اکت",
    "فرانت‌اند",
    "بک‌اند",
    "تجربیات شخصی",
    "علوم کامپیوتر",
    "مقالات آموزشی",
  ],
  openGraph: {
    title: "بلاگ‌گیک | خوراک روزانه‌ی ذهن‌های کنجکاو",
    description:
      "با بلاگ‌گیک همیشه یک قدم جلوتر از دنیای برنامه‌نویسی و تکنولوژی باشید. آموزش‌ها، مقالات و تجربه‌های ارزشمند برای علاقه‌مندان به وب و علم روز.",
    url: process.env.NEXT_PUBLIC_FRONT_URL,
    siteName: "Bloggeek",
    locale: "fa_IR",
    type: "website",
    images: [
      {
        url: "https://i.postimg.cc/xCtXVZZ0/logo.jpg",
        width: 1200,
        height: 630,
        alt: "بلاگ‌گیک - مقالات و آموزش علم روز",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "بلاگ‌گیک | خوراک روزانه‌ی ذهن‌های کنجکاو",
    description:
      "مقالات و آموزش‌های برنامه‌نویسی، تکنولوژی و تجربه‌های شخصی در بلاگ‌گیک.",
    images: ["https://i.postimg.cc/xCtXVZZ0/logo.jpg"],
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    // apple: "/apple-touch-icon.png",
  },

  alternates: {
    canonical: process.env.NEXT_PUBLIC_FRONT_URL,
  },
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

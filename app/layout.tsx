import type { Metadata } from "next";
import { Vazirmatn } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";

const vazir = Vazirmatn({
  variable: "--font-vazir",
  subsets: ["arabic"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | Bloggeek",
    default: "خوش آمدید | Bloggeek",
  },
  description:
    "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html dir="rtl" lang="fa-IR" className="!mx-auto min-h-[100svh]">
      <body className={`${vazir.variable}  antialiased`}>
        {/* <div className="grid grid-rows-[min-content-1fr]"> */}
        {/* <Header /> */}
        <div className="max-sm:px-2 sm:px-4 max-sm:pt-12 sm:pt-16">
          <Providers>{children}</Providers>
        </div>
        {/* </div> */}
      </body>
    </html>
  );
}

import BackButton from "@/components/back-button";
import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "404 - صفحه پیدا نشد",
  description: "صفحه ای که دنبالش میگردی ، پیدا نشد!",
};

export default function GlobalNotFound() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-slate-100">
      {/* Glow */}
      <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-indigo-500/20 blur-3xl" />
      <div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-fuchsia-500/20 blur-3xl" />

      <div className="relative z-10 text-center">
        <p className="mb-2 text-sm uppercase tracking-widest text-slate-400">
          Error 404
        </p>

        <h1 className="text-[140px] font-black leading-none tracking-tight text-slate-200 md:text-[180px]">
          404
        </h1>

        <h2 className="mt-4 mb-1 text-2xl font-semibold">
          صفحه‌ای که دنبالش بودی پیدا نشد
        </h2>

        <p className="mx-auto mt-4 max-w-md text-sm text-slate-400" dir="rtl">
          یا لینک اشتباهه، یا این صفحه حذف شده، یا کلاً وجود نداشته. در هر صورت،
          اینجا جای درستی نیست 😅
        </p>

        <div className="mt-8 flex items-center justify-center gap-4">
          <Link
            href="/"
            className="rounded-lg bg-indigo-500 px-6 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-600"
          >
            بازگشت به خانه
          </Link>

          <BackButton />
        </div>
      </div>
    </div>
  );
}

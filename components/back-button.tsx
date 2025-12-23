"use client";

export default function BackButton() {
  return (
    <button
      onClick={() => history.back()}
      className="rounded-lg border border-slate-600 px-6 py-2.5 text-sm text-slate-300 transition hover:bg-slate-800"
    >
      صفحه قبل
    </button>
  );
}

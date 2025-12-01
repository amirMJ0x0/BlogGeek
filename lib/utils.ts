import { clsx, type ClassValue } from "clsx";
import { formatDistanceToNow } from "date-fns/formatDistanceToNow";
import { faIR } from "date-fns/locale";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isEmail(str: string): boolean {
  return /^\S+@\S+\.\S+$/.test(str);
}

// Regex برای شماره‌های موبایل ایران
const mobileReg =
  /(0|\+98)?([ ]|-|[()]){0,2}9[1-4]([ ]|-|[()]){0,2}(?:[0-9]([ ]|-|[()]){0,2}){8}/gi;

// Regex برای حذف کاراکترهای غیر عددی
const junkReg = /[^\d]/g;

// مپ برای تبدیل اعداد فارسی به انگلیسی
const persianNums: RegExp[] = [
  /۰/g,
  /۱/g,
  /۲/g,
  /۳/g,
  /۴/g,
  /۵/g,
  /۶/g,
  /۷/g,
  /۸/g,
  /۹/g,
];

/**
 * تبدیل اعداد فارسی به انگلیسی
 */
export function num2en(str: string): string {
  return persianNums.reduce(
    (acc, regex, index) => acc.replace(regex, index.toString()),
    str
  );
}

const en = "0123456789";
const fa = "۰۱۲۳۴۵۶۷۸۹";

function toPersianDigits(str: string): string {
  return str.replace(/\d/g, (d) => fa[en.indexOf(d)]);
}

export function numberToPersian(num: number | string): string {
  const n = typeof num === "string" ? Number(num) : num;
  if (isNaN(n)) return String(num);

  if (n >= 1_000_000) {
    const m = (n / 1_000_000).toFixed(1).replace(/\.0$/, "");
    return toPersianDigits(m) + "m";
  }

  if (n >= 1000) {
    const k = (n / 1000).toFixed(1).replace(/\.0$/, "");
    return toPersianDigits(k) + "k";
  }

  return toPersianDigits(String(n));
}

/**
 * دریافت شماره‌های موبایل از متن
 * @param str متن ورودی
 * @returns آرایه‌ای از شماره‌های موبایل نرمال‌شده (به فرمت 09xxxxxxxxx)
 */
export function getMobiles(str: string): string[] {
  const normalized = num2en(str); // فارسی → انگلیسی
  const matches = normalized.match(mobileReg) || [];

  return matches.map((value) => {
    let clean = value.replace(junkReg, ""); // حذف کاراکترهای اضافی
    if (!clean.startsWith("0")) {
      // اگر با +98 شروع شده باشه
      if (clean.startsWith("98")) {
        clean = "0" + clean.slice(2);
      } else {
        clean = "0" + clean;
      }
    }
    return clean;
  });
}

export function isValidIranianMobile(str: string): boolean {
  const normalized = num2en(str).replace(/[^\d]/g, "");
  return /^(\+98|0)?9\d{9}$/.test(normalized);
}

export const emailRegex =
  /^[A-Za-z0-9._%+-]+@(gmail\.com|yahoo\.com|outlook\.com|hotmail\.com|live\.com|icloud\.com|protonmail\.com|zoho\.com)$/;

export const phoneNumberRegex = /^09\d{2}[-\s]?\d{3}[-\s]?\d{4}$/;

/**
 * username pattern: letters, numbers, dot, underscore, hyphen
 * length 1..100
 */
export const usernameRegex = /^[A-Za-z0-9._-]{1,100}$/;

/**
 * detect persian/arabic letters (forbid in social inputs)
 */
export const hasArabicPersian = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF]/;

export const formatJoinDate = (dateString: string): string => {
  const date = new Date(dateString);
  return formatDistanceToNow(date, {
    addSuffix: true,
    locale: faIR,
  });
};

export function debounce<Args extends unknown[]>(
  func: (...args: Args) => void | Promise<void>,
  delay: number
) {
  let timer: ReturnType<typeof setTimeout>;
  return (...args: Args): void => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      void func(...args);
    }, delay);
  };
}

export function toPersianFrom(dateStr: string) {
  const date = new Date(dateStr);

  const formatter = new Intl.DateTimeFormat("fa-IR", {
    year: "numeric",
    month: "short",
    calendar: "persian",
  });

  return `عضویت از ${formatter.format(date).replace(/^\d+ /, "")}`;
}

// تابع چک‌کننده URL شبکه‌های اجتماعی
export const validSocialUrl = (url: string): boolean => {
  if (!url) return true; // خالی یعنی کاربر نخواسته وارد کنه، پس معتبره

  const pattern =
    /^(https?:\/\/)?(www\.)?(instagram\.com|linkedin\.com\/in|twitter\.com|t\.me)\/[A-Za-z0-9._%-]+\/?$/i;
  return pattern.test(url.trim());
};

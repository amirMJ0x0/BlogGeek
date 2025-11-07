import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { faIR } from "date-fns/locale";
import { formatDistanceToNow } from "date-fns/formatDistanceToNow";

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
const hasArabicPersian = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF]/;

export const formatJoinDate = (dateString: string): string => {
  const date = new Date(dateString);
  return formatDistanceToNow(date, {
    addSuffix: true,
    locale: faIR,
  });
};

export function debounce<F extends (...args: any[]) => void>(
  func: F,
  delay: number
) {
  let timer: NodeJS.Timeout;
  return (...args: Parameters<F>) => {
    clearTimeout(timer);
    timer = setTimeout(() => func(...args), delay);
  };
}

export function toPersianFrom(dateStr: string) {
  const date = new Date(dateStr);

  const formatter = new Intl.DateTimeFormat("fa-IR", {
    year: "numeric",
    month: "long",
    calendar: "persian", // مهم! تقویم جلالی
  });

  return `از ${formatter.format(date).replace(/^\d+ /, "")}`;
}

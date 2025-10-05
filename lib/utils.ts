import { clsx, type ClassValue } from "clsx";
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

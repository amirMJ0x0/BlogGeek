"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Calendar, User2 } from "lucide-react";
import Image from "next/image";
import { useUserStore } from "../store/useUserStore";

const SettingAboutSection = () => {
  const { user } = useUserStore();
  return <div className="p-4 space-y-10 md:space-y-14 " dir="rtl"></div>;
};

export default SettingAboutSection;

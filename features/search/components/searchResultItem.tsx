import Link from "next/link";
import { CommandItem } from "@/components/ui/command";
import { User, BookOpen, Hash } from "lucide-react";
import { SearchItem } from "../types/search";
import Image from "next/image";

const icons = {
  blog: BookOpen,
  user: User,
  tag: Hash,
};

const itemTypeTo_fa = (type: "blog" | "user" | "tag") => {
  switch (type) {
    case "blog":
      return "بلاگ";
    case "tag":
      return "تگ";
    case "user":
      return "کاربر";
  }
};

export default function SearchResultItem({ item }: { item: SearchItem }) {
  const IconComponent = icons[item.type];
  const itemType = itemTypeTo_fa(item.type);
  return (
    <CommandItem onSelect={() => (window.location.href = item.href)}>
      <Link
        href={item.href}
        className="flex items-center w-full justify-between"
      >
        <div className="flex items-center gap-2">
          <IconComponent className="size-4 text-muted-foreground" />
          {/* {item.image && (
            <Image src={item.image} alt={""} width={30} height={20}/>
          )} */}
          <span className="font-medium">{item.title}</span>
        </div>
        <span className="text-xs text-muted-foreground capitalize">
          {itemType}
        </span>
      </Link>
    </CommandItem>
  );
}

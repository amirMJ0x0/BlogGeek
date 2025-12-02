import Image from "next/image";
import Link from "next/link";
import marcoos from "@/public/assets/images/marcooos.png";
import { Button } from "@/components/ui/button";
export default function NotFound() {
  return (
    <div className="flex flex-col justify-center items-center h-screen w-svw">
      <div className="z-10 space-y-2">
        <h2 className="text-4xl font-bold">رابرت! یه مشکلی پیش اومده</h2>
        <p>صفحه ای که دنبالش میگردی یوخده بخدا</p>
        <Link href="/">
          <Button variant={"ghost"}>بریم خونمون حاجی</Button>
        </Link>
      </div>
      <div>
        <Image src={marcoos} alt="مارکووووس" fill placeholder="blur" />
      </div>
    </div>
  );
}

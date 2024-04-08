"use client";

import Image from "next/image";
import { FileIcon, Loader2, StarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { UploadButton } from "./_components/upload-button";
import SideNav from "./side-nav";

export function Placeholer() {
  return (
    <div className="flex flex-col gap-8 justify-center items-center mt-24">
      <Image
        alt="Empty folder picture"
        src="/empty.svg"
        width={300}
        height={300}
      />
      <div className="text-2xl">You have no files, upload one now!</div>
      <UploadButton />
    </div>
  );
}

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="  light:bg-white">
      <div className="container mx-auto pl-0">
      <div className="flex gap-8">
        <div className="pt-24 ">
        <SideNav />
        </div>
        <div className="w-full pt-4">{children}</div>
      </div>
      </div>
    </main>
  );
};

export default DashboardLayout;

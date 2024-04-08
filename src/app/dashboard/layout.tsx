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
    <main className="container mx-auto pt-12">
      <div className="flex gap-8">
        <SideNav />
        <div className="w-full">{children}</div>
      </div>
    </main>
  );
};

export default DashboardLayout;

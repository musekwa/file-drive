"use client";
import { Button } from "@/components/ui/button";
import clsx from "clsx";
import { FileIcon, Folder, FolderOpen, Library, StarIcon, Trash2 } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { UploadButton } from "./_components/upload-button";

const SideNav = () => {
  const pathname = usePathname();
  return (
    <div className="max-w-40 flex flex-col gap-2 ">
      
      <Link href={"/dashboard/files"}>
        <Button variant={"link"} className={clsx("flex gap-2", {
          " text-sky-600/90 underline": pathname === "/dashboard/files",
        })}>
          <div className="flex gap-2 text-base items-center">
          <FolderOpen className="h-6 w-6" /> All Files

          </div>
        </Button>
      </Link>
      <Link href={"/dashboard/favorites"}>
        <Button variant={"link"} className={clsx("flex gap-2", {"text-sky-600/90  underline": pathname === "/dashboard/favorites"})}>
        <div className="flex gap-2 text-base items-center">
          <StarIcon className="h-6 w-6" /> Favorites
          </div>
        </Button>
      </Link>
      <Link href={"/dashboard/trash"}>
        <Button variant={"link"} className={clsx("flex gap-2", {"text-sky-600/90 underline": pathname === "/dashboard/trash"})}>
        <div className="flex gap-2 text-base items-center">
          <Trash2 className="h-6 w-6" /> Trash
          </div>
        </Button>
      </Link>
    </div>
  );
};

export default SideNav;

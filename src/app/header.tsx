"use client";
import { Button } from "@/components/ui/button";
import {
  OrganizationSwitcher,
  Protect,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React, { Suspense } from "react";
import { ModeToggle } from "./mode-toggle";
import { FolderOpen, LayoutDashboard } from "lucide-react";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import TopBar from "./dashboard/_components/search-bar";
import { UploadButton } from "./dashboard/_components/upload-button";
import clsx from "clsx";
import { usePathname } from "next/navigation";

const Header = () => {
  const pathname = usePathname();
  return (
    <div className="sticky top-0 right-0 left-0 z-50 border-b py-4 bg-gray-100 dark:bg-slate-900">
      <div className="px-4 md:px-6 lg:px-20 mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex gap-8 items-center">
            <Link href={"/"}>
              <div className="flex flex-col justify-center items-center cursor-pointer hover:scale-105 transition-all duration-300">
                <Image
                  alt="File Drive Logo"
                  src="/logo.png"
                  width={35}
                  height={35}
                />
                <h1 className="text-lg font-bold text-sky-600/90">
                  <span>File</span>
                  <span className="text-slate-500">Drive</span>
                </h1>
              </div>
            </Link>
          </div>

          <SignedIn>
            {pathname === "/" ? (
              <Link href={"/dashboard/files"} className="">
                <Button
                  variant={"default"}
                  className="flex gap-1 items-center justify-between bg-sky-600/90 text-white"
                >
                  <FolderOpen className="h-6 w-6 text-white" />
                  All Files
                </Button>
              </Link>
            ) : (
              <UploadButton />
            )}
          </SignedIn>

          <ModeToggle />
          <div className="flex gap-4 items-center ">
            <SignedOut>
              <SignInButton mode="modal">
                <Button className="bg-sky-600/90 text-white">Sign In</Button>
              </SignInButton>
            </SignedOut>

            <div className="hidden lg:block">
              <OrganizationSwitcher />
            </div>
            <UserButton />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;

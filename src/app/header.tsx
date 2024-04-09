"use client"
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
import React from "react";
import { ModeToggle } from "./mode-toggle";
import { FolderOpen, LayoutDashboard } from "lucide-react";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

const Header = () => {

  return (
    <div className="sticky top-0 z-50 border-b py-4 bg-gray-100 dark:bg-slate-900">
      <div className="container mx-auto flex items-center justify-between">
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
        <SignedIn
        >
          <Link href={"/dashboard/files"} className="">
            <Button
              variant={"default"}
              className="flex gap-1 items-center justify-between bg-sky-600/90 text-white"
            >
              <FolderOpen className="h-6 w-6 text-white" />
              All Files
            </Button>
          </Link>
        </SignedIn>
        <ModeToggle />
        <div className="flex gap-2 ">
          <SignedOut>
            <SignInButton mode="modal">
              <Button className="bg-sky-600/90 text-white">Sign In</Button>
            </SignInButton>
          </SignedOut>
          <OrganizationSwitcher />
          <UserButton />
        </div>
      </div>
    </div>
  );
};

export default Header;

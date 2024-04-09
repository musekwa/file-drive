"use client";
import { SignInButton, useOrganization, useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";

import { z } from "zod";

import Image from "next/image";
import { FileIcon, Loader2, StarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

import { useState } from "react";
import Link from "next/link";
import { UploadButton } from "../_components/upload-button";
import { api } from "../../../../convex/_generated/api";
import SearchBar from "../_components/search-bar";
import FileCard from "../_components/file-card";
import FileBrowser from "../_components/file-browser";

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

export default function FilesPage() {
  const organization = useOrganization();
  const user = useUser();
  const [query, setQuery] = useState("");
  let orgId: string | undefined;
  if (organization.isLoaded && user.isLoaded) {
    orgId = organization.organization?.id ?? user.user?.id;
  }

  const files = useQuery(api.files.getFiles, orgId ? { orgId, query } : "skip");
  const isLoading = files === undefined && user.isSignedIn;

  return (
    <div className="min-h-screen">
      <FileBrowser title="All Files" />
    </div>
  );
}

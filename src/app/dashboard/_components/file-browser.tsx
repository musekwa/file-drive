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

export default function FileBrowser({ title, favorites }: { title: string, favorites?: boolean }) {
  const organization = useOrganization();
  const user = useUser();
  const [query, setQuery] = useState("");
  let orgId: string | undefined;
  if (organization.isLoaded && user.isLoaded) {
    orgId = organization.organization?.id ?? user.user?.id;
  }

  const files = useQuery(api.files.getFiles, orgId ? { orgId, query, favorites } : "skip");
  const isLoading = files === undefined && user.isSignedIn;

  return (
    <div>
      {isLoading && (
        <div className="flex flex-col h-screen items-center justify-center">
          <Loader2 className="mx-auto h-24 w-24 animate-spin" />
          <div className="text-xl text-center text-gray-500">Loading...</div>
        </div>
      )}

      {!isLoading && (
        <>
          <div className="flex justify-between items-center">
            <h1 className="text-4xl font-bold">{title}</h1>

            <SearchBar query={query} setQuery={setQuery} />

            <UploadButton />
          </div>

          {files && files.length === 0 && <Placeholer />}

          <div className="grid grid-cols-3 gap-4 my-4">
            {files?.map((file) => {
              return <FileCard key={file._id} file={file} />;
            })}
          </div>
        </>
      )}
      {!user.isSignedIn && (
        <div className="flex flex-col h-full items-center justify-center gap-4">
          <Image
            alt="Empty folder picture"
            src="/signin.svg"
            width={200}
            height={200}
            className="border rounded-full p-4 shadow-md"
          />
          <div className="text-lg">Sign in to see your files</div>
          <SignInButton>
            <Button>Sign In</Button>
          </SignInButton>
        </div>
      )}
    </div>
  );
}

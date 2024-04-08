"use client";
import { SignInButton, useOrganization, useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";

import { z } from "zod";

import Image from "next/image";
import {
  FileIcon,
  GridIcon,
  Loader2,
  Rows3Icon,
  StarIcon,
  TableIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";

import { use, useState } from "react";
import Link from "next/link";
import { UploadButton } from "../_components/upload-button";
import { api } from "../../../../convex/_generated/api";
import SearchBar from "../_components/search-bar";
import FileCard from "../_components/file-card";
import { DataTable } from "./file-table";
import { columns } from "./columns";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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

export default function FileBrowser({
  title,
  favoritesOnly,
  deleteOnly,
}: {
  title: string;
  favoritesOnly?: boolean;
  deleteOnly?: boolean;
}) {
  const organization = useOrganization();
  const user = useUser();
  const [query, setQuery] = useState("");
  let orgId: string | undefined;
  if (organization.isLoaded && user.isLoaded) {
    orgId = organization.organization?.id ?? user.user?.id;
  }
  const favorites = useQuery(
    api.files.getAllFavorites,
    orgId ? { orgId } : "skip"
  );
  const files = useQuery(
    api.files.getFiles,
    orgId ? { orgId, query, favorites: favoritesOnly, deleteOnly } : "skip"
  );
  const isLoading = files === undefined && user.isSignedIn;

  const modifiedFiles = files?.map((file) => ({
    ...file,
    isFavorited: (favorites ?? []).some(
      (favorite) => favorite.fileId === file._id
    ),
  }));

  return (
    <div>
      <div className="flex justify-between items-center border shadow-md py-4 px-2">
        <h1 className="text-2xl font-bold text-gray-600">{title}</h1>

        <SearchBar query={query} setQuery={setQuery} />

        <UploadButton />
      </div>
      {files && files.length === 0 ? (
        <Placeholer />
      ) : (
        <Tabs defaultValue="grid">
          <TabsList className="mb-4">
            <TabsTrigger value="grid" className="flex gap-2 items-center">
              <GridIcon className="w-6 h-6" />
              Grid
            </TabsTrigger>
            <TabsTrigger value="table" className="flex gap-2 items-center">
              <Rows3Icon className="w-6 h-6" />
              Table
            </TabsTrigger>
          </TabsList>
          {isLoading && (
            <div className="flex flex-col h-[300px] items-center justify-center">
              <Loader2 className="mx-auto h-24 w-24 animate-spin" />
              <div className="text-xl text-center text-gray-500">
                Loading...
              </div>
            </div>
          )}
          <TabsContent value="grid">
            <div className="grid grid-cols-3 gap-4 my-4">
              {modifiedFiles?.map((file) => (
                <FileCard key={file._id} file={file} />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="table">
            <DataTable columns={columns} data={modifiedFiles ?? []} />
          </TabsContent>
        </Tabs>
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

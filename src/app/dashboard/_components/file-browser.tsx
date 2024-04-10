"use client";
import {
  SignInButton,
  SignedIn,
  useOrganization,
  useUser,
} from "@clerk/nextjs";
import { useQuery } from "convex/react";

import Image from "next/image";
import { GridIcon, Loader2, Rows3Icon } from "lucide-react";
import { Button } from "@/components/ui/button";

import { Suspense, useState } from "react";
import { UploadButton } from "../_components/upload-button";
import { api } from "../../../../convex/_generated/api";
import SearchBar from "./search-bar";
import FileCard from "../_components/file-card";
import { DataTable } from "./file-table";
import { columns } from "./columns";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Doc } from "../../../../convex/_generated/dataModel";
import { Label } from "@/components/ui/label";
import Placeholder from "./placeholder";
import FileTabs from "./file-tabs";
import Fallback from "./fallback";


export default function FileBrowser({
  title,
  favoritesOnly,
  deleteOnly,
}: {
  title: string;
  favoritesOnly?: boolean;
  deleteOnly?: boolean;
}) {
  // const organization = useOrganization();
  const user = useUser();
  const [query, setQuery] = useState("");
  const [type, setType] = useState<Doc<"files">["type"] | "all">("all");
  // let orgId: string | undefined;
  // if (organization.isLoaded && user.isLoaded) {
  //   orgId = organization.organization?.id ?? user.user?.id;
  // }
  // const favorites = useQuery(
  //   api.files.getAllFavorites,
  //   orgId ? { orgId } : "skip"
  // );
  // const files = useQuery(
  //   api.files.getFiles,
  //   orgId
  //     ? {
  //         orgId,
  //         query,
  //         favorites: false,
  //         deleteOnly: false,
  //         type: type === "all" ? undefined : type,
  //       }
  //     : "skip"
  // );
  // const isLoading = files === undefined && user.isSignedIn;

  // const modifiedFiles = files?.map((file) => ({
  //   ...file,
  //   isFavorited: (favorites ?? []).some(
  //     (favorite) => favorite.fileId === file._id
  //   ),
  // }));



  return (
    <div className="">

      <Suspense fallback={<Fallback />}>
        <FileTabs
          title={title}
          favoritesOnly={favoritesOnly}
          deleteOnly={deleteOnly}
          query={query}
          setQuery={setQuery}
          type={type}
          setType={setType}
        />
      </Suspense>


      {!user.isSignedIn && (
        <div className="flex flex-col h-screen items-center justify-center gap-4">
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

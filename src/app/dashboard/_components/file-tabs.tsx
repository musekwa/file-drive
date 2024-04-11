"use client";
import { useOrganization, useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";

import { GridIcon, Loader2, Rows3Icon } from "lucide-react";

import { Dispatch, SetStateAction, useState } from "react";

import { api } from "../../../../convex/_generated/api";
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
import SearchBar from "./search-bar";
import clsx from "clsx";

const FileTabs = ({
  query,
  setQuery,
  type,
  setType,
  favoritesOnly,
  deleteOnly,
  title,
}: {
  query: string;
  setQuery: Dispatch<SetStateAction<string>>;
  type: Doc<"files">["type"] | "all" | "trash" | "favorites";
  setType: Dispatch<SetStateAction<Doc<"files">["type"] | "all">>;
  favoritesOnly?: boolean;
  deleteOnly?: boolean;
  title: string;
}) => {
  const organization = useOrganization();
  const user = useUser();
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
    orgId
      ? {
          orgId,
          query,
          favorites: favoritesOnly || type === "favorites",
          deleteOnly: deleteOnly || type === "trash",
          type:
            type === "favorites" || type === "trash" || type === "all"
              ? undefined
              : type,
        }
      : "skip"
  );
  const isLoading = files === undefined && user.isSignedIn;

  const modifiedFiles = files?.map((file) => ({
    ...file,
    isFavorited: (favorites ?? []).some(
      (favorite) => favorite.fileId === file._id
    ),
  }));
  const [selectedIndex, setSelectedIndex] = useState<string>("grid");

  return (
    <div>
      <Tabs
        defaultValue={"grid"}
        value={selectedIndex}
        onValueChange={setSelectedIndex}
      >
        <div className="flex justify-between items-center">
          <div className="flex flex-col-reverse md:flex-row gap-2 items-center justify-between w-full">
            <TabsList className="w-full flex justify-between">
              <TabsTrigger
                value={"grid"}
                className={clsx("flex gap-2 items-center w-full", {})}
              >
                <GridIcon className="w-6 h-6" />
                Grid
              </TabsTrigger>
              <TabsTrigger
                value={"table"}
                className={clsx("flex gap-2 items-center w-full", {})}
              >
                <Rows3Icon className="w-6 h-6" />
                Table
              </TabsTrigger>
            </TabsList>
            <div className="w-full flex justify-center items-center">
              <SearchBar setQuery={setQuery} />
            </div>

            <div className="flex gap-2 items-center w-full ">
              {/* <Label htmlFor="type-select" className="hidden lg:block">Type Filter</Label> */}
              <Select
                value={type}
                onValueChange={(newvalue: any) => {
                  if (newvalue === "all") {
                    setType("all");
                  }
                  setType(newvalue);
                }}
                name="type-select"
              >
                <SelectTrigger
                  className="w-full"
                  defaultValue="Select a category"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Files</SelectItem>
                  <SelectItem value="image">Images Only </SelectItem>
                  <SelectItem value="csv">CSVs Only</SelectItem>
                  <SelectItem value="pdf">PDFs Only</SelectItem>

                  <SelectItem value="favorites" className="lg:hidden">
                    Favorites Only
                  </SelectItem>
                  <SelectItem value="trash" className="lg:hidden">
                    Deleted Only
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {isLoading && (
          <div className="flex flex-col items-center justify-center h-screen">
            <Loader2 className="mx-auto h-24 w-24 animate-spin" />
            <div className="text-xl text-center text-gray-500">Loading...</div>
          </div>
        )}
        <TabsContent value="grid">
          {modifiedFiles && modifiedFiles.length > 0 && (
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 my-4 justify-items-center">
              {modifiedFiles?.map((file) => (
                <FileCard key={file._id} file={file} />
              ))}
            </div>
          )}
          {modifiedFiles && modifiedFiles.length === 0 && (
            <div className="flex flex-col items-center justify-center">
              <Placeholder />
            </div>
          )}
        </TabsContent>
        <TabsContent value="table">
          {modifiedFiles && modifiedFiles.length > 0 && (
            <DataTable columns={columns} data={modifiedFiles ?? []} />
          )}
          {modifiedFiles && modifiedFiles.length === 0 && (
            <div className="flex flex-col items-center justify-center">
              <Placeholder />
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FileTabs;

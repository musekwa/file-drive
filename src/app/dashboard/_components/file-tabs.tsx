"use client";
import {
  useOrganization,
  useUser,
} from "@clerk/nextjs";
import { useQuery } from "convex/react";

import { GridIcon, Loader2, Rows3Icon } from "lucide-react";

import { useState } from "react";

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

const FileTabs = ({}: {}) => {
//   const organization = useOrganization();
  const user = useUser();
//   const [query, setQuery] = useState("");
  const [type, setType] = useState<Doc<"files">["type"] | "all">("all");
//   let orgId: string | undefined;
//   if (organization.isLoaded && user.isLoaded) {
//     orgId = organization.organization?.id ?? user.user?.id;
//   }
//   const favorites = useQuery(
//     api.files.getAllFavorites,
//     orgId ? { orgId } : "skip"
//   );
//   const files = useQuery(
//     api.files.getFiles,
//     orgId
//       ? {
//           orgId,
//           query,
//           favorites: false,
//           deleteOnly: false,
//           type: type === "all" ? undefined : type,
//         }
//       : "skip"
//   );
const users = useQuery(api.users.getUsers);
  const isLoading = users === undefined && user.isSignedIn;

  console.log("users", users)

//   const modifiedFiles = files?.map((file) => ({
//     ...file,
//     isFavorited: (favorites ?? []).some(
//       (favorite) => favorite.fileId === file._id
//     ),
//   }));

  return (
    <Tabs defaultValue="grid">
      <div className="flex justify-between items-center">
        <div>
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
        </div>
        <div className="flex gap-2 items-center">
          <Label htmlFor="type-select">Type Filter</Label>
          <Select
            value={type}
            onValueChange={(newvalue: any) => {
              setType(newvalue);
            }}
            name="type-select"
          >
            <SelectTrigger className="w-[180px]" defaultValue="all">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="image">Image</SelectItem>
              <SelectItem value="csv">CSV</SelectItem>
              <SelectItem value="pdf">PDF</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {isLoading && (
        <div className="flex flex-col items-center justify-center">
          <Loader2 className="mx-auto h-24 w-24 animate-spin" />
          <div className="text-xl text-center text-gray-500">Loading...</div>
        </div>
      )}
      <TabsContent value="grid">
        {
            users && users.length > 0 && (
              <div className="grid grid-cols-3 gap-4 my-4">
                {users?.map((user) => (
                 <div>
                    {user.name}
                 </div>
                ))}
              </div>
            )
        }
        {/* {modifiedFiles && modifiedFiles.length > 0 && (
          <div className="grid grid-cols-3 gap-4 my-4">
            {modifiedFiles?.map((file) => (
              <FileCard key={file._id} file={file} />
            ))}
          </div>
        )} */}
        {/* {modifiedFiles && modifiedFiles.length === 0 && (
          <div className="flex flex-col items-center justify-center">
            <Placeholder />
          </div>
        )} */}
      </TabsContent>
      <TabsContent value="table">
        {/* {modifiedFiles && modifiedFiles.length > 0 && (
          <DataTable columns={columns} data={modifiedFiles ?? []} />
        )} */}
        {/* {modifiedFiles && modifiedFiles.length === 0 && (
          <div className="flex flex-col items-center justify-center">
            <Placeholder />
          </div>
        )} */}
      </TabsContent>
    </Tabs>
  );
};

export default FileTabs;

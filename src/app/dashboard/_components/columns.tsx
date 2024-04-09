"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Doc, Id } from "../../../../convex/_generated/dataModel";
import { formatRelative } from "date-fns";
import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import FileAction from "./file-actions";
import { StarIcon } from "lucide-react";

function UserCell({ userId }: { userId: Id<"users"> }) {
  const userProfile = useQuery(api.users.getUserProfile, {
    userId: userId,
  });
  return (
    <div className="flex gap-2 text-xs text-gray-700 w-40 items-center">
      <Avatar className="w-6 h-6">
        <AvatarImage src={userProfile?.image} />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      {userProfile?.name}
    </div>
  );
}

export const columns: ColumnDef<Doc<"files"> & {
  isFavorited: boolean;
}>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      return <div className="flex gap-2">{row.original.name} {row.original.isFavorited ? <StarIcon fill="yellow" className="h-4 w-4 text-yellow-500" /> : null}</div>;
    },
  },
  {
    accessorKey: "type",
    header: "Type",
  },
  // {
  //   accessorKey: "user",
  //   header: "User",
  //   cell: ({ row }) => {
  //     return <UserCell userId={row.original.userId} />;
  //   },
  // },
  {
    accessorKey: "uploadedOn",
    header: "Uploaded On",
    cell: ({ row }) => {
      return (
        <div>
          {formatRelative(new Date(row.original._creationTime), new Date())}
        </div>
      );
    },
  },
  // {
  //   accessorKey: "action",
  //   header: "Action",
  //   cell: ({ row }) => {
  //     const fileUrl = useQuery(api.files.getFileUrl, {
  //       fileId: row.original.fileId,
  //     });
  //     return (
  //       <FileAction 
  //         file={row.original}
  //         fileUrl={fileUrl || ""}
  //         isFavorited={row.original.isFavorited}
  //       />
  //     );
  //   },
  // }
];

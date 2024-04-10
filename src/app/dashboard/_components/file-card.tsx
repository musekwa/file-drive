import React, { ReactNode } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Doc, Id } from "../../../../convex/_generated/dataModel";
import { FileText, GanttChartIcon, ImageIcon, StarIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatRelative } from "date-fns";

import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import Image from "next/image";
import FileAction from "./file-actions";

const FileCard = ({
  file,
}: {
  file: Doc<"files"> & {
    isFavorited: boolean;
  };
}) => {
  const typeIcons = {
    image: <ImageIcon className="h-4 w-4" />,
    pdf: <FileText className="h-4 w-4" />,
    csv: <GanttChartIcon className="h-4 w-4" />,
  } as Record<Doc<"files">["type"], ReactNode>;

  const fileUrl = useQuery(api.files.getFileUrl, {
    fileId: file.fileId,
  });
  const userProfile = useQuery(api.users.getUserProfile, {
    userId: file.userId,
  });

  function getFileUrl(fileId: Id<"_storage">): string {
    return `${process.env.NEXT_PUBLIC_CONVEX_URL}/api/storage/${fileId}`;
  }

  return (
    <div className="p-1 shadow-md rounded-md relative hover:scale-105 transition-all duration-300 h-[200px] w-[200px] m-4 border">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2">
        {file.type === "image" && (
          <Image
            alt={file.name}
            src={fileUrl as string}
            width={200}
            height={200}
            className="object-contain"
          />
        )}
        {file.type === "pdf" && (
          <Image
            alt={file.name}
            src={"/pdfLogo.svg"}
            width={200}
            height={200}
            className="object-contain"
          />
        )}
        {file.type === "csv" && (
          <Image
            alt={file.name}
            src={"/csvLogo.svg"}
            width={200}
            height={200}
            className="object-contain"
          />
        )}
      </div>

      <div className="flex justify-between items-center">
        <div className="flex gap-2 items-center">
          {typeIcons[file.type]}

          {file.isFavorited && (
            <StarIcon fill="yellow" className="h-4 w-4  text-yellow-500" />
          )}
        </div>
        <FileAction
          fileUrl={fileUrl as string}
          isFavorited={file.isFavorited}
          file={file}
        />
      </div>

      <div className="absolute bottom-1 left-2  right-2">
        <p className="text-base font-mono text-center leading-4 ">
          {file.name}
        </p>
        <div>
          <div className="flex gap-2 justify-between items-end text-gray-600 text-[10px] ">
            <div className="flex gap-2 items-center">
              <Avatar className="w-4 h-4 ">
                <AvatarImage src={userProfile?.image} />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              {userProfile?.name?.split(" ")[0]}
            </div>
            <p className="text-[10px] text-right">
              {formatRelative(new Date(file._creationTime), new Date())}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileCard;

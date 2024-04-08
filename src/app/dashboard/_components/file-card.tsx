import React, { ReactNode, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";


import { Doc, Id } from "../../../../convex/_generated/dataModel";
import { Button } from "@/components/ui/button";
import {
  FileText,
  GanttChartIcon,
  ImageIcon,
  StarIcon,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { format, formatDistance, formatRelative, subDays } from "date-fns";

import { useMutation, useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { useToast } from "@/components/ui/use-toast";
import Image from "next/image";
import { Protect } from "@clerk/nextjs";
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
    <Card className="relative hover:scale-105 transition-all duration-300">
      <CardHeader className="pt-1">
        <CardTitle className="flex gap-2 text-base font-normal items-center">
          {typeIcons[file.type]} {file.name}{" "}
          {file.isFavorited && (
            <StarIcon fill="yellow" className="h-4 w-4  text-yellow-500" />
          )}
        </CardTitle>
        <div className="absolute right-2 top-0">
          <FileAction
            fileUrl={fileUrl as string}
            isFavorited={file.isFavorited}
            file={file}
          />
        </div>
      </CardHeader>
      <CardContent className="flex justify-center items-center h-[200px]">
        {file.type === "image" && (
          <Image
            alt={file.name}
            src={fileUrl as string}
            width={200}
            height={200}
          />
        )}
        {file.type === "pdf" && <FileText className="h-24 w-24" />}
        {file.type === "csv" && <GanttChartIcon className="h-24 w-24" />}
      </CardContent>
      <CardFooter className="flex justify-between gap-2 items-end text-[10px] text-gray-600 bg-gray-100 pt-1 pb-1">
        <div className="flex gap-2 items-end">
          <Avatar className="w-6 h-6 ">
            <AvatarImage src={userProfile?.image} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          {userProfile?.name}
        </div>
        <div>
          Uploaded on {formatRelative(new Date(file._creationTime), new Date())}
        </div>
      </CardFooter>
    </Card>
  );
};

export default FileCard;

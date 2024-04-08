import React, { ReactNode, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Doc, Id } from "../../../../convex/_generated/dataModel";
import { Button } from "@/components/ui/button";
import {
  DeleteIcon,
  Download,
  FileIcon,
  FileText,
  GanttChartIcon,
  ImageIcon,
  MoreVertical,
  StarHalf,
  StarIcon,
  TextIcon,
  Trash,
  UndoIcon,
  UserIcon,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { format, formatDistance, formatRelative, subDays } from "date-fns";

import { useMutation, useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { useToast } from "@/components/ui/use-toast";
import Image from "next/image";
import { Protect } from "@clerk/nextjs";

const FileCardAction = ({
  file,
  isFavorited,
  fileUrl,
}: {
  file: Doc<"files">;
  isFavorited: boolean;
  fileUrl: string;
}) => {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const toggleFavorite = useMutation(api.files.toggleFavorite);
  const restoreFile = useMutation(api.files.restoreFile);
  const deleteFile = useMutation(api.files.deleteFile);

  const { toast } = useToast();

  return (
    <>
      <AlertDialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
        {/* <AlertDialogTrigger>Open</AlertDialogTrigger> */}
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action will mark your file for our deletion process. Files
              are deleted periodically.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={async () => {
                await deleteFile({
                  fileId: file._id,
                });
                setIsConfirmOpen(false);
                toast({
                  variant: "success",
                  title: "File marked for deletion",
                  description: "Your file will be deleted soon",
                });
              }}
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <DropdownMenu>
        <DropdownMenuTrigger>
          <MoreVertical />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem
            className="flex gap-1  items-center cursor-pointer"
            onClick={() => {
              window.open(fileUrl as string, "_blank");
            }}
          >
            <Download className="h-4 w-4 " /> Download
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => {
              toggleFavorite({
                fileId: file._id,
              });
            }}
          >
            {isFavorited ? (
              <div className="flex gap-1  items-center cursor-pointer">
                <StarHalf className="h-4 w-4 text-yellow-500" /> Unfavorite
              </div>
            ) : (
              <div className="flex gap-1  items-center cursor-pointer">
                <StarIcon className="h-4 w-4" /> Favorite
              </div>
            )}
          </DropdownMenuItem>
          <Protect role="org:admin" fallback={<></>}>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                if (file.shouldDelete) {
                  restoreFile({
                    fileId: file._id,
                  });
                } else {
                  setIsConfirmOpen(true);
                }
              }}
              className="flex gap-1  items-center cursor-pointer"
            >
              {file.shouldDelete ? (
                <div className="flex gap-1 text-green-600  items-center">
                  <UndoIcon className="h-4 w-4" /> Restore
                </div>
              ) : (
                <div className="flex gap-1 text-red-600 items-center">
                  <Trash className="h-4 w-4" /> Delete
                </div>
              )}
            </DropdownMenuItem>
          </Protect>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

const FileCard = ({
  file,
  favorites,
}: {
  file: Doc<"files">;
  favorites: Doc<"favorites">[];
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

  const isFavorited = favorites.some(
    (favorite) => favorite.fileId === file._id
  );

  return (
    <Card className="relative hover:scale-105 transition-all duration-300">
      <CardHeader className="pt-1">
        <CardTitle className="flex gap-2 text-base font-normal items-center">
          {typeIcons[file.type]} {file.name}{" "}
          {isFavorited && (
            <StarIcon fill="yellow" className="h-4 w-4  text-yellow-500" />
          )}
        </CardTitle>
        <div className="absolute right-2 top-0">
          <FileCardAction
            fileUrl={fileUrl as string}
            isFavorited={isFavorited}
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

import React, { ReactNode, useState } from "react";
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
  MoreVertical,
  StarHalf,
  StarIcon,
  TextIcon,
  Trash,
  UndoIcon,
  UserIcon,
} from "lucide-react";

import { useMutation, useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { useToast } from "@/components/ui/use-toast";
import Image from "next/image";
import { Protect } from "@clerk/nextjs";

const FileAction = ({
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
  const me = useQuery(api.users.getMe);

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
          <MoreVertical className="h-5 w-5 text-sky-600" />
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
          <Protect 
            condition={(check)=>{
              return check({ 
                role: "org:admin",
               }) || file.userId === me?._id
            }}
          fallback={<></>}>
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

export default FileAction
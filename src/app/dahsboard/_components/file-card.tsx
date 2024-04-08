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
import { DeleteIcon, FileText, GanttChartIcon, ImageIcon, MoreVertical, TextIcon, Trash } from "lucide-react";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { useToast } from "@/components/ui/use-toast";
import Image from "next/image";

const FileCardAction = ({ file}: {file: Doc<"files"> }) => {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
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
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
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
                  title: "File Deleted",
                  description: "You have deleted a file",
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
          onClick={() => setIsConfirmOpen(true)}
          className="flex gap-1 text-red-600 items-center cursor-pointer">
            <Trash className="h-4 w-4" /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

const FileCard = ({ file }: { file: Doc<"files"> }) => {

  const typeIcons = {
    "image": <ImageIcon />,
    "pdf": <FileText />,
    "csv": <GanttChartIcon />,
    
  } as Record<Doc<"files">["type"], ReactNode>;

  const fileUrl = useQuery(api.files.getFileUrl, {
    fileId: file.fileId,
  });
  
  function getFileUrl(fileId: Id<"_storage"> ): string {
    return `${process.env.NEXT_PUBLIC_CONVEX_URL}/api/storage/${fileId}`
  }
  
  return (
    <Card className="relative">
      <CardHeader>
        <CardTitle className="flex gap-2">{typeIcons[file.type]} {file.name}</CardTitle>
        <div className="absolute right-2 top-2">
          <FileCardAction file={file} />
        </div>
      </CardHeader>
      <CardContent className="flex justify-center items-center h-[200px]">
        {
          file.type === "image" && <Image alt={file.name} src={fileUrl as string} width={200} height={200} />
        }
        {
          file.type === "pdf" && <FileText className="h-24 w-24" />
        }
        {
          file.type === "csv" && <GanttChartIcon className="h-24 w-24" />
        }
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button
          onClick={() => {
            window.open(fileUrl as string, "_blank"  );
          }}
        >Download</Button>
      </CardFooter>
    </Card>
  );
};

export default FileCard;

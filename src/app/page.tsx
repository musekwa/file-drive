"use client";
import { SignInButton, useOrganization, useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { z } from "zod";

import { UploadButton } from "./dahsboard/_components/upload-button";
import FileCard from "./dahsboard/_components/file-card";
import Image from "next/image";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";


export default function Home() {
  const organization = useOrganization();
  const user = useUser();
  let orgId: string | undefined;
  if (organization.isLoaded && user.isLoaded) {
    orgId = organization.organization?.id ?? user.user?.id;
  }


  const files = useQuery(api.files.getFiles, orgId ? { orgId } : "skip");
  const isLoading = files === undefined && user.isSignedIn;

  return (
    <main className="container mx-auto pt-12">
      {isLoading && (
        <div className="flex flex-col h-screen items-center justify-center">
          <Loader2 className="mx-auto h-24 w-24 animate-spin" />
          <div className="text-xl text-center text-gray-500">Loading...</div>
        </div>
      )}

      {!isLoading && files && files.length === 0 && (
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
      )}
      {!isLoading && files && files.length > 0 && (
        <>
          <div className="flex justify-between items-center">
            <h1 className="text-4xl font-bold">Your Files</h1>

            <UploadButton />
          </div>
          <div className="grid grid-cols-3 gap-4 my-4">
            {files?.map((file) => {
              return <FileCard key={file._id} file={file} />;
            })}
          </div>
        </>
      )}
       {
        !user.isSignedIn && (
   
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
        )
      }
    </main>
  );
}

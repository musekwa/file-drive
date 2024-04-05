"use client";
import { Button } from "@/components/ui/button";
import {
  SignInButton,
  SignOutButton,
  SignedIn,
  SignedOut,
  useSession,
} from "@clerk/nextjs";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

export default function Home() {
  const session = useSession();
  const createFile = useMutation(api.files.createFile);
  const files = useQuery(api.files.getFiles);
  console.log(files)
  return (
    <main className="flex flex-col justify-center items-center h-screen w-full">
      <div className="space-x-6">
        <SignedIn>
          <SignOutButton>
            <Button>Sign Out</Button>
          </SignOutButton>
        </SignedIn>
        <SignedOut>
          <SignInButton mode="modal">
            <Button>Sign In</Button>
          </SignInButton>
        </SignedOut>

        {
          files?.map((file) => (
            <div key={file._id}>
              {file.name}
            </div>
          ))
        }

        <Button
          onClick={() => {
            createFile({
              name: "test",
            });
          }}
        >
          Click Me
        </Button>
      </div>
    </main>
  );
}

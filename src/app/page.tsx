"use client";
import { Button } from "@/components/ui/button";
import {
  SignInButton,
  SignOutButton,
  SignedIn,
  SignedOut,
  useOrganization,
  useSession,
  useUser,
} from "@clerk/nextjs";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState, useTransition } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  title: z.string().min(2).max(200),
  file: z
    .custom<FileList>((val) => val instanceof FileList, "Required")
    .refine((files) => files.length > 0, { message: "Please select a file" }),
});

export default function Home() {
  const organization = useOrganization();
  const user = useUser();
  // const session = useSession();
  let orgId: string | undefined;
  if (organization.isLoaded && user.isLoaded) {
    orgId = organization.organization?.id ?? user.user?.id;
  }
  const createFile = useMutation(api.files.createFile);
  const files = useQuery(api.files.getFiles, orgId ? { orgId } : "skip");
  const generateUploadUrl = useMutation(api.files.generateUploadUrl);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      file: undefined,
    },
  });
  const fileRef = form.register("file");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    startTransition(async () => {
      const postUrl = await generateUploadUrl();
      const result = await fetch(postUrl, {
        method: "POST",
        headers: { "Content-Type": values.file[0].type },
        body: values.file[0],
      });
      const { storageId } = await result.json();
      try {
        await createFile({
          name: values.title,
          fileId: storageId,
          orgId: "",
          // type: "image",
        });
                
        form.reset();

        setIsDialogOpen(false);
        toast({
          variant: "success",
          title: "File Uploaded",
          description: "Now everyone can view your file.",
        })
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Something went wrong",
          description: "Your file could not be uploaded, try again later.",
        });
      }
    });
  }

  return (
    <main className="container mx-auto pt-12">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold">Your Files</h1>

        <Dialog open={isDialogOpen} onOpenChange={(isOpen)=>{
          setIsDialogOpen(isOpen);
          if(!isOpen){
            form.reset();
          }
        }}>
          <DialogTrigger asChild>
            <Button onClick={() => {}}>Upload Files</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="mb-8">Upload your File here</DialogTitle>
              <DialogDescription>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8"
                  >
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Title</FormLabel>
                          <FormControl>
                            <Input
                              disabled={isPending}
                              placeholder="Title of your file"
                              {...field}
                            />
                          </FormControl>
                          {/* <FormDescription>
                            The title of your file
                          </FormDescription> */}
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="file"
                      render={({ field }) => {
                        return (
                          <FormItem>
                            <FormLabel>File</FormLabel>
                            <FormControl>
                              <Input
                                disabled={isPending}
                                type="file"
                                placeholder="Your file"
                                {...fileRef}
                              />
                            </FormControl>
                            {/* <FormDescription>
                            Your file
                          </FormDescription> */}
                            <FormMessage />
                          </FormItem>
                        );
                      }}
                    />

                    <Button 
                    
                    disabled={isPending} 
                    type="submit"
                    >
                      {
                        isPending && (
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        )
                      }
                      Submit
                    </Button>
                  </form>
                </Form>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
      <div className="space-x-6">
        {files?.map((file) => <div key={file._id}>{file.name}</div>)}
      </div>
    </main>
  );
}

"use client";

import { Button } from "@/components/ui/button";
import { SignedIn, useOrganization, useUser } from "@clerk/nextjs";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useMutation } from "convex/react";

import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Dispatch, SetStateAction, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { FolderOpen, Loader2, SearchIcon } from "lucide-react";
import { Doc } from "../../../../convex/_generated/dataModel";
import { useSearchParams } from "next/navigation";
import { UploadButton } from "./upload-button";
import Link from "next/link";

const formSchema = z.object({
  query: z.string().min(0).max(200),
});

const SearchBar = ({
  setQuery,
}: {
  setQuery: Dispatch<SetStateAction<string>>;
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      query: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setQuery(values.query);
  }

  return (

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="relative items-center w-full"
        >
          <FormField
            control={form.control}
            name="query"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    size={35}
                    placeholder="Search files by their names"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="absolute top-1/2 right-0 -translate-y-1/2">
            <Button
              // size={"sm"}
              type="submit"
              disabled={form.formState.isSubmitting}
              className="w-fit dark:text-white bg-transparent hover:bg-transparent hover:scale-90 transition-all duration-300 "
            >

              <SearchIcon className="h-6 w-6 text-gray-500 hover:text-sky-600" />
            </Button>
          </div>
        </form>
      </Form>

  );
};

export default SearchBar;

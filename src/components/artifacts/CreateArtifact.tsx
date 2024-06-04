/*
CreateArtifact.tsx
AUTHORS: NA, FC, VD, RK, AP
LAST EDITED: 6-3-2024
DESCRIPTION: CreateArtifact.tsx: Describes the "CreateArtifact" component which allows for users to
input their own media and turns them into artifacts.
*/

import React, { useState } from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Roboto_Mono } from "next/font/google";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCollectionStore } from "@/stores";

// Imports the Roboto Mono font
const robotoMono = Roboto_Mono({
  weight: "variable",
  subsets: ["latin"],
});

// Defines the React Functional Component "CreateArtifact" 
const CreateArtifact: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // Initialize react form components
  const { register, handleSubmit, setValue, reset } = useForm();

  // Hook to access the global state of components
  const store = useCollectionStore();

  // The query client for cache management
  const queryClient = useQueryClient();

  // This defines a mutation for creating an artifact
  const createArtifactMutation = useMutation({
    mutationFn: (data: { description: string; b64File: string }) => {
      // Uses a POST request to submit a new artifact
      return axios.post("/api/artifact/create.artifact", {
        description: data.description,
        b64File: data.b64File,
      });
    },
    onSuccess: async () => {
      // Invalidates the query to refresh the data
      await queryClient.invalidateQueries({
        queryKey: ["collections", store.collection.id],
      });
    },
  });

  // This handles form submission
  const onSubmit = (data: any) => {
    console.log(`DATA: ${JSON.stringify(data)}`);

    // await axios.post("/api/upload", { b64File: data.b64File });
    // Calls the mutation to create and submit artifact
    createArtifactMutation.mutate({
      description: data.description,
      b64File: data.b64File,
    });
    reset();
  };

  // This will handle the file change to base 64.
  const handleFileChange = async (e: any) => {
    const file = e.target.files[0];

    if (file) {
      const base64 = await convertToBase64(file);
      setValue("b64File", base64);
    }
  };

  // Converts the file to base 64
  const convertToBase64 = (file: any) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  return (
    <DropdownMenu.Root
      onOpenChange={() => {
        reset();
      }}
    >
      <DropdownMenu.Trigger asChild>{children}</DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="border-[1px] border-[#282828] bg-black/[0.83] backdrop-blur-md p-2 rounded-lg shadow-md shadow-black/80 flex flex-col gap-y-1 max-h-52"
          sideOffset={10}
          align="end"
        >
          <form onSubmit={handleSubmit(onSubmit)} className="text-white">
            <div className="flex flex-col gap-y-4">
              <input
                {...register("picture")}
                type="file"
                required
                onChange={handleFileChange}
              />
              <h1
                className={`text-[#969696] font-light text-sm ${robotoMono.className}`}
              >
                Description
              </h1>
              <input
                {...register("description")}
                type="textarea"
                placeholder="Artifact Description"
                className="bg-black text-white text-sm placeholder:text-[#282828] placeholder:italic border-transparent focus:border-transparent focus:ring-0 focus:outline-none focus:ring-[#000000]"
              />
              <input type="hidden" {...register("b64File")} />
              <div className="flex flex-row items-center justify-center pt-2 pb-1 border-t-[1px] border-[#282828]">
                <button
                  className="text-[#969696] text-xs font-light hover:text-white w-full"
                  type="submit"
                >
                  Save Artifact
                </button>
              </div>
            </div>
          </form>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export { CreateArtifact };

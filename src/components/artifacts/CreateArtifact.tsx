/// AUTHORS: AP, VD
/// LAST EDITED: 6-3-2024
/// DESCRIPTION: CreateArtifact.tsx: Describes the component used for creating Artifacts as well as the functions used to initialize them in the Database.

import React, { useState } from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Roboto_Mono } from "next/font/google";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCollectionStore } from "@/stores";

const robotoMono = Roboto_Mono({
  weight: "variable",
  subsets: ["latin"],
});

const CreateArtifact: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { register, handleSubmit, setValue, reset } = useForm();

  const store = useCollectionStore();

  const queryClient = useQueryClient();

  const createArtifactMutation = useMutation({
    mutationFn: (data: { description: string; b64File: string }) => {
      return axios.post("/api/artifact/create.artifact", {
        description: data.description,
        b64File: data.b64File,
      });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["collections", store.collection.id],
      });
    },
  });

  const onSubmit = (data: any) => {
    console.log(`DATA: ${JSON.stringify(data)}`);

    // await axios.post("/api/upload", { b64File: data.b64File });
    createArtifactMutation.mutate({
      description: data.description,
      b64File: data.b64File,
    });
    reset();
  };

  const handleFileChange = async (e: any) => {
    const file = e.target.files[0];

    if (file) {
      const base64 = await convertToBase64(file);
      setValue("b64File", base64);
    }
  };

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

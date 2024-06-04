/*
CreateCollection.tsx
AUTHORS: NA, FC, VD, RK, AP
LAST EDITED: 6-3-2024
DESCRIPTION: CreateCollection.tsx: This lets the user create collection components to fill with artifacts
and organize media
*/

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Divider } from "@/components/shared";
import { IconPicker } from "@/components/shared";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import axios from "axios";
import { getIconByName, IconName } from "@/utils";

// Defines the React Functional Component CreateCollection 
const CreateCollection: React.FC<{
  setShowCreateCollection: (state: boolean) => void;
}> = ({ setShowCreateCollection }) => {
  const schema = z.object({
    name: z.string().min(1).max(20),
  });

  const {
    // Use React Hooks register, handleSubmit, watch, formState.
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid, isLoading, isDirty },
  } = useForm<z.infer<typeof schema>>({
    // Validation
    mode: "onBlur",
    resolver: zodResolver(schema),
  });


  const [icon, setIcon] = useState<IconName>();

  // The query client for cache management
  const queryClient = useQueryClient();

  // This mutation creates a collection
  const createCollectionMutation = useMutation({
    mutationFn: ({ name }: z.infer<typeof schema>) => {
      return axios.post("/api/collection/create.collection", { name, icon });
    },
    onSuccess: () => {
      // Invalidates the query to refresh the data
      queryClient.invalidateQueries({ queryKey: ["collections"] });
      setShowCreateCollection(false);
    },
  });

  // This handles form submission
  const onSubmit: SubmitHandler<z.infer<typeof schema>> = (
    data: z.infer<typeof schema>
  ) => {
    // Creates the collection
    createCollectionMutation.mutate({ name: data.name });
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-row items-center py-4 relative">
          <IconPicker setIcon={setIcon}>
            <div className="w-6 select-none">
              {getIconByName({ name: icon })}
            </div>
          </IconPicker>
          <input
            {...register("name")}
            placeholder="New Collection"
            className="bg-black text-white text-sm placeholder:text-[#282828] placeholder:italic ml-8 w-40 border-transparent focus:border-transparent focus:ring-0 focus:outline-none focus:ring-[#000000]"
          />
          <div className="absolute right-2 flex flex-row items-center gap-x-4">
            <button
              type="submit"
              className="text-[#969696] lg:hover:text-white active:text-white text-sm font-light underline underline-offset-1"
            >
              create
            </button>
            <button
              className="text-[#646464] lg:hover:text-white active:text-white text-sm font-light"
              onClick={() => setShowCreateCollection(false)}
            >
              cancel
            </button>
          </div>
        </div>
      </form>
      <Divider />
    </div>
  );
};

export { CreateCollection };

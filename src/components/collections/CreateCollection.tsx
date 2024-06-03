/// AUTHORS: AP, VD
/// LAST EDITED: 6-3-2024
/// DESCRIPTION: CreateCollection.tsx: Describes the Create Collection UI component, as well as the functions used to create an input collection in the Database.

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Divider } from "@/components/shared";
import { IconPicker } from "@/components/shared";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import axios from "axios";
import { getIconByName, IconName } from "@/utils";

const CreateCollection: React.FC<{
  setShowCreateCollection: (state: boolean) => void;
}> = ({ setShowCreateCollection }) => {
  const schema = z.object({
    name: z.string().min(1).max(20),
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid, isLoading, isDirty },
  } = useForm<z.infer<typeof schema>>({
    mode: "onBlur",
    resolver: zodResolver(schema),
  });

  const [icon, setIcon] = useState<IconName>();

  const queryClient = useQueryClient();

  const createCollectionMutation = useMutation({
    mutationFn: ({ name }: z.infer<typeof schema>) => {
      return axios.post("/api/collection/create.collection", { name, icon });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["collections"] });
      setShowCreateCollection(false);
    },
  });

  const onSubmit: SubmitHandler<z.infer<typeof schema>> = (
    data: z.infer<typeof schema>
  ) => {
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

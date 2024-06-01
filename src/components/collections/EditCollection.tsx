import Avatar from "boring-avatars";
import { IconPicker, Divider } from "@/components/shared";
import { useState, useEffect } from "react";
import { IconName, getIconByName } from "@/utils";
import {
  ArrowRight,
  ArrowRightCircle,
  LongArrowUpLeft,
  Plus,
} from "iconoir-react";
import { Roboto_Mono } from "next/font/google";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useForm, SubmitHandler } from "react-hook-form";
import type { Collection } from "@prisma/client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const robotoMono = Roboto_Mono({
  weight: "variable",
  subsets: ["latin"],
});

const EditCollection: React.FC<{
  collectionId: number;
  setEditCollection: (id: number) => void;
}> = ({ collectionId, setEditCollection }) => {
  const [icon, setIcon] = useState<IconName>();

  const schema = z.object({
    name: z.string().min(1).max(20).optional(),
  });

  const { register, handleSubmit } = useForm<z.infer<typeof schema>>({
    mode: "onBlur",
    resolver: zodResolver(schema),
  });

  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: [`collection_${collectionId}`, "collections"],
    queryFn: async () => {
      const data = (
        await axios.get("/api/collection/get.collection", {
          params: {
            id: collectionId,
          },
        })
      ).data as Omit<Collection, "icon"> & { icon?: IconName };

      return data;
    },
    refetchInterval: 1,
  });

  // const data: Omit<Collection, "icon"> & { icon?: IconName } = {
  //   id: 1,
  //   name: "Test Collection",
  //   icon: "AddLens",
  // };

  const editCollectionMutation = useMutation({
    mutationFn: ({ ...data }: z.infer<typeof schema> & { icon?: IconName }) => {
      return axios.post("/api/collection/edit.collection", {
        id: collectionId,
        ...data,
      });
    },
    onSuccess: () => {
      console.log("MUTATION SUCCESS");
      queryClient.invalidateQueries({
        queryKey: ["collections", `collection_${collectionId}`],
      });
    },
  });

  // const onSubmit: SubmitHandler<z.infer<typeof schema>> = (
  //   data: z.infer<typeof schema>
  // ) => {
  //   console.log("EDITED");
  //   console.log(data);
  //   editCollectionMutation.mutate(data);
  // };

  useEffect(() => {
    icon && editCollectionMutation.mutate({ icon: icon! });
  }, [icon]);

  return (
    data && (
      <>
        <div className="flex flex-row items-center justify-between">
          <button
            className="flex flex-row gap-x-2 group"
            onClick={() => {
              setEditCollection(0);
            }}
          >
            <LongArrowUpLeft
              className="text-[#969696] group-hover:text-white"
              height={20}
              width={20}
            />
            <h1 className="text-sm text-[#969696] group-hover:text-white font-light">
              Collections
            </h1>
          </button>
          <div className="flex flex-row gap-x-3">
            {getIconByName({
              name: icon ?? data?.icon,
              nullIcon: { size: "SMALL" },
            })}
            <h1 className="text-sm text-[#969696] font-light">{data?.name}</h1>
          </div>
        </div>
        <div className="my-4">
          <Divider />
        </div>
        <div>
          <div className="flex flex-row items-center gap-x-12">
            <div className="flex flex-row items-center gap-x-4">
              <h1
                className={`text-sm text-[#969696] font-light ${robotoMono.className}`}
              >
                Icon
              </h1>
              <IconPicker setIcon={setIcon}>
                <div className="border-[1px] border-[#282828] p-2 rounded-md select-none">
                  {getIconByName({
                    name: icon ?? data?.icon,
                    nullIcon: { size: "LARGE" },
                    css: "text-[#969696] hover:text-white",
                  })}
                </div>
              </IconPicker>
            </div>
            <form
              className="flex flex-row items-center gap-x-4"
              onSubmit={handleSubmit((data) => {
                editCollectionMutation.mutate({ name: data.name });
              })}
              onBlur={handleSubmit((data) => {
                editCollectionMutation.mutate({ name: data.name });
              })}
            >
              <h1
                className={`text-sm text-[#969696] font-light ${robotoMono.className}`}
              >
                Name
              </h1>
              <input
                className="bg-black text-white placeholder:text-[#969696] hover:text-white text-sm focus:ring-0 focus:outline-none focus:placeholder:text-[#282828]"
                placeholder={data?.name}
                {...register("name")}
              />
            </form>
          </div>
        </div>
      </>
    )
  );
};

export { EditCollection };

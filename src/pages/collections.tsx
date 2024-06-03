/// AUTHORS: AP, VD
/// LAST EDITED: 6-3-2024
/// DESCRIPTION: collections.tsx: Contains component declaration for Collections viewing interface, as well as all functions required to run it

import type { NextPageWithLayout } from "@/components/layout";
import axios from "axios";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { Plus, LongArrowUpLeft } from "iconoir-react";
import { getIconByName, IconName } from "@/utils";
import { useState } from "react";
import { useRouter } from "next/router";
import { Divider } from "@/components/shared";
import type { Collection } from "@prisma/client";
import { CreateCollection, EditCollection } from "@/components/collections";
import { useCollectionStore } from "@/stores";

const Collection: React.FC<{
  id: number;
  icon?: IconName;
  name: string;
  setEditCollection: (id: number) => void;
}> = ({ id, icon, name, setEditCollection }) => {
  const queryClient = useQueryClient();

  const store = useCollectionStore();

  const deleteCollectionMutation = useMutation({
    mutationFn: () => {
      return axios.post("/api/collection/delete.collection", { id });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["collections"] });
      if (store.collection.id == id) {
        store.setCollection({ id: 1, name: "The Pile", icon: "ReportColumns" });
      }
    },
  });

  return (
    <div className="flex flex-row items-center py-4 relative">
      <div className="w-6">{getIconByName({ name: icon })}</div>
      <h1 className="text-white text-sm ml-8 w-40 truncate">{name}</h1>
      {id != 1 && (
        <div className="flex flex-row items-center gap-x-6 absolute right-2">
          <button
            className="text-[#969696] lg:hover:text-white active:text-white text-sm font-light underline underline-offset-1"
            onClick={() => {
              setEditCollection(id);
            }}
          >
            edit
          </button>
          <button
            className="text-[#969696] lg:hover:text-red-500 active:text-red-500 text-sm font-light"
            onClick={() => {
              deleteCollectionMutation.mutate();
            }}
          >
            delete
          </button>
        </div>
      )}
    </div>
  );
};

const Page: NextPageWithLayout = (props: any) => {
  const [showCreateCollection, setShowCreateCollection] = useState(false);
  const [editCollection, setEditCollection] = useState<number | undefined>();

  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["collections"],
    queryFn: async () => {
      const data = (await axios.get("/api/collection/get.collections"))
        .data as Array<Omit<Collection, "icon"> & { icon?: IconName }>;

      // console.log(data);

      return data;
    },
    refetchInterval: 1,
  });

  // const data: Array<{
  //   id: number;
  //   name: string;
  //   icon?: IconName;
  // }> = [
  //   { id: 1, name: "Collection 1" },
  //   { id: 2, name: "Collection 2" },
  //   { id: 3, name: "Collection 3" },
  //   { id: 1, name: "Collection 1" },
  //   { id: 2, name: "Collection 2" },
  //   { id: 3, name: "Collection 3" },
  //   { id: 1, name: "Collection 1" },
  //   { id: 2, name: "Collection 2" },
  //   { id: 3, name: "Collection 3" },
  //   { id: 1, name: "Collection 1" },
  //   { id: 2, name: "Collection 2" },
  //   { id: 3, name: "Collection 3" },
  // ];

  const router = useRouter();

  return (
    data && (
      <div className="flex flex-row justify-center">
        <div className="flex flex-col mt-24 pt-32 ml-8 md:m-0 lg:m-0 w-full lg:w-1/2">
          <button
            className="flex flex-row gap-x-2 group"
            onClick={() => {
              router.push("/");
            }}
          >
            <LongArrowUpLeft
              className="text-[#969696] group-hover:text-white"
              height={20}
              width={20}
            />
            <h1 className="text-[#969696] group-hover:text-white font-light text-sm">
              Back
            </h1>
          </button>
          <div className="flex flex-col gap-y-1 mt-8">
            <h1 className="text-[1.8rem] font-light italic text-white">
              Dead simple inspiration
            </h1>
            <h1 className="text-[1.8rem] font-light italic text-white">
              curation
            </h1>
          </div>
          <h1 className="w-[20rem] md:w-[26rem] text-sm text-[#969696] mt-6">
            Curate is a simple service to compile all your inspiration into one
            feed
          </h1>
          <div className="mt-12">
            {editCollection ? (
              <EditCollection
                collectionId={editCollection}
                setEditCollection={setEditCollection}
              />
            ) : (
              // <></>
              <div className="flex flex-col">
                <div className="flex flex-row justify-between items-center">
                  <h1 className={`text-[#969696] text-sm font-light`}>
                    Collections
                  </h1>
                  <button
                    className="flex flex-row items-center gap-x-1 group"
                    onClick={() => {
                      setShowCreateCollection(true);
                    }}
                  >
                    <Plus
                      className="text-[#969696] lg:group-hover:text-white group-active:text-white"
                      height={18}
                      width={18}
                    />
                    <h1 className="text-[#969696] lg:group-hover:text-white group-active:text-white text-sm font-light">
                      New Collection
                    </h1>
                  </button>
                </div>
                <div className="mt-2">
                  <Divider />
                </div>
                {showCreateCollection && (
                  <CreateCollection
                    setShowCreateCollection={setShowCreateCollection}
                  />
                )}
                <div className="flex flex-col h-80 overflow-y-scroll scrollbar-hide">
                  {data.map((collection, i: number) => (
                    <>
                      <Collection
                        key={collection.id}
                        id={collection.id}
                        icon={collection.icon}
                        name={collection.name}
                        setEditCollection={setEditCollection}
                      />
                      {i !== data.length - 1 && <Divider key={i} />}
                    </>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  );
};

Page.navbar = false;
Page.footer = true;

export default Page;

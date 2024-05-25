"use client";

import { useRouter } from "next/router";
import { Button } from "@/components/shared";
import { Dropdown } from "../shared/Dropdown";
import type { Collection } from "@prisma/client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import type { IconName } from "@/utils";
import { getIconByName } from "@/utils";
import { useCollectionStore } from "@/stores";

const Navbar: React.FC<{}> = () => {
  const router = useRouter();

  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["collections"],
    queryFn: async () => {
      const data = (await axios.get("/api/collection/get.collections"))
        .data as Array<Omit<Collection, "icon"> & { icon?: IconName }>;

      // console.log(data);

      return data;
    },
  });

  const store = useCollectionStore();

  // const data: Array<{
  //   id: number;
  //   name: string;
  //   icon: string;
  // }> = [
  //   { id: 1, name: "Collection 1", icon: "" },
  //   { id: 2, name: "Collection 2", icon: "" },
  //   { id: 3, name: "Collection 3", icon: "" },
  // ];

  return (
    data && (
      <div className="flex flex-row items-center">
        <div className="w-[1%] bg-black/80 backdrop-blur-md" />
        <div className="flex flex-row justify-between items-center px-2 lg:px-12 py-3 mb-8 border-b-[1px] border-b-[#282828] bg-black/80 backdrop-blur-md w-[98%]">
          <div className="flex flex-row items-center gap-x-2">
            <h1 className="text-[#646464] font-light text-sm italic">Index</h1>
            <>
              <h1 className="text-[#646464] font-light text-md italic">/</h1>

              <Dropdown
                // items={sampleCollectionsData}
                // items={data}
                items={data?.map(
                  (
                    collection: Omit<Collection, "icon"> & { icon?: IconName }
                  ) => ({
                    name: collection.name,
                    icon: collection.icon
                      ? getIconByName({ name: collection.icon })
                      : "",
                    onClick: () => {
                      store.setCollection({
                        id: collection.id,
                        name: collection.name,
                        icon: collection.icon,
                      });
                    },
                  })
                )}
                action={{
                  name: "Manage Collections",
                  onClick: () => {
                    router.push("/collections");
                    router.events.on("routeChangeStart", () => {
                      // setLoading(true);
                    });
                    router.events.on("routeChangeComplete", () => {
                      // setLoading(false);
                    });
                  },
                }}
              >
                <button className="ring-0 outline-none flex flex-row w-36">
                  <span className="text-[#969696] hover:text-white underline underline-offset-2 text-sm font-light block truncate">
                    {store?.collection?.name}
                    {/* Testing */}
                  </span>
                </button>
              </Dropdown>
            </>
          </div>
          <Button
            name="New Post"
            style="secondary"
            size="small"
            css="underline underline-offset-2"
          />
        </div>
        <div className="w-[1%] bg-black/80 backdrop-blur-md" />
      </div>
    )
  );
};

export { Navbar };

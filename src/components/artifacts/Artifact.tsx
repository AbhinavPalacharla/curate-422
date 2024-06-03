/*
Artifact.tsx
AUTHORS: NA, FC, VD, RK, AP
LAST EDITED: 6-3-2024
DESCRIPTION: Artifact.tsx: Describes the "artifact" component which contains all media data within our application.
*/

import Image from "next/image";
import Link from "next/link";
import type { ArtifactMedia } from "@prisma/client";
import { PostMetaInfo } from "./PostMetaInfo";
import { Dropdown } from "../shared/Dropdown";
import { getIconByName } from "@/utils";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import type { Collection } from "@prisma/client";
import type { IconName } from "@/utils";
import { useCollectionStore } from "@/stores";

// This defines the React Functional Component "Artifact" which will be used to store media
const Artifact: React.FC<{
  id: number;
  media: Array<ArtifactMedia>;
  description: string;
  createdAt: Date;
}> = ({ id, media, description, createdAt }) => {
  // media = Array(3).fill(media[0]);

  // Hook to access the global state of components
  const store = useCollectionStore();

  // The query client for cache management
  const queryClient = useQueryClient();

  // This will fetch the collections data using Quaries
  const { data, isLoading } = useQuery({
    queryKey: ["collections"],
    queryFn: async () => {
      // This fetches the collection from the API 
      const data = (await axios.get("/api/collection/get.collections"))
        .data as Array<Omit<Collection, "icon"> & { icon?: IconName }>;

      return data;
    },
  });

  // This uses a mutation to move artifacts between collections
  const moveArtifactMutation = useMutation({
    mutationFn: ({
      artifactId,
      collectionId,
    }: {
      artifactId: number;
      collectionId: number;
    }) => {
      // Make a POST request to remove an artifact
      return axios.post("/api/artifact/move.artifact", {
        artifactId,
        collectionId,
      });
    },
    onSuccess: () => {
      // Invalidates the query to refresh the data
      queryClient.invalidateQueries({
        queryKey: ["collections", store.collection.id],
      });
    },
  });

  // This uses a mutation to create another of the same artifact and put it in a new collection
  const copyArtifactMutation = useMutation({
    mutationFn: ({
      artifactId,
      collectionId,
    }: {
      artifactId: number;
      collectionId: number;
    }) => {
      // This uses a POST request to move add the artifact to another collection
      return axios.post("/api/artifact/copy.artifact", {
        artifactId,
        collectionId,
      });
    },
    onSuccess: () => {
      // Invalidates the query to refresh the data 
      queryClient.invalidateQueries({
        queryKey: ["collections", store.collection.id],
      });
    },
  });

  // This uses a mutation to delete an artifact from a collection
  const deleteArtifactMutation = useMutation({
    mutationFn: ({ artifactId }: { artifactId: number }) => {
      return axios.post("/api/artifact/delete.artifact", {
        artifactId,
      });
    },
    onSuccess: () => {
      // This ivalidates the query to refresh the data 
      queryClient.invalidateQueries({
        queryKey: ["collections", store.collection.id],
      });
    },
  });

  return (
    data && (
      <div className="border-[#292929] border-[1px] rounded-lg lg:rounded-md p-2 lg:p-4 lg:pb-6 mb-4">
        <Dropdown
          items={[
            {
              name: "Move to ...",
              icon: getIconByName({ name: "ArrowRightCircle", size: 18 }),
              subItems: data?.map(
                (
                  collection: Omit<Collection, "icon"> & { icon?: IconName }
                ) => ({
                  name: collection.name,
                  icon: collection.icon
                    ? getIconByName({ name: collection.icon })
                    : "",
                  onClick: () => {
                    moveArtifactMutation.mutate({
                      artifactId: id,
                      collectionId: collection.id,
                    });
                  },
                })
              ),
            },
            {
              name: "Copy to ...",
              icon: getIconByName({ name: "Copy", size: 18 }),
              subItems: data?.map(
                (
                  collection: Omit<Collection, "icon"> & { icon?: IconName }
                ) => ({
                  name: collection.name,
                  icon: collection.icon
                    ? getIconByName({ name: collection.icon, size: 18 })
                    : "",
                  onClick: () => {
                    copyArtifactMutation.mutate({
                      artifactId: id,
                      collectionId: collection.id,
                    });
                  },
                })
              ),
            },
            {
              name: "Delete",
              icon: getIconByName({
                name: "Trash",
                size: 18,
              }),
              onClick: () => {
                console.log(`DELETE`);
                deleteArtifactMutation.mutate({
                  artifactId: id,
                });
              },
            },
          ]}
        >
          <button
            className={`text-[#969696] hover:text-white tracking-wide border-[1px] border-[#282828] w-7 h-7 rounded-md ring-0 outline-none select-none`}
          >
            ···
          </button>
        </Dropdown>
        {media && (
          <div className="pt-4">
            {media.length === 1 ? (
              <div className="flex flex-row items-center justify-center">
                <Image
                  key={media[0].imageURL}
                  alt={"Image"}
                  src={media[0].imageURL}
                  width={4096}
                  height={4096}
                  className="rounded-sm max-w-[100%] lg:min-h-[24rem] max-h-[36rem] w-auto"
                />
              </div>
            ) : (
              <div className="flex flex-row overflow-x-scroll scroll-smooth gap-x-4 scrollbar-hide">
                {media.map((m) => (
                  <Image
                    key={m.imageURL}
                    alt={"Image"}
                    src={m.imageURL}
                    width={4096}
                    height={4096}
                    className="h-96 max-w-none w-auto rounded-sm"
                  />
                ))}
              </div>
            )}
          </div>
        )}
        <h1 className="text-white pt-4">{description}</h1>
        <PostMetaInfo date={createdAt} />
      </div>
    )
  );
};

export { Artifact };

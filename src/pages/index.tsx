import type { NextPageWithLayout } from "@/components/layout";
import { useCollectionStore } from "@/stores";
import { Artifact, ArtifactMedia } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const Page: NextPageWithLayout = (props: any) => {
  const store = useCollectionStore();

  const { data, isLoading } = useQuery({
    queryKey: ["collections", store.collection.id],
    queryFn: async () => {
      const data = (
        await axios.get(
          `/api/artifact/get.artifacts?collectionId=${store.collection?.id}`
        )
      ).data as Array<Artifact & { media: ArtifactMedia }>;

      console.log(data);

      return data;
    },
    refetchInterval: 1,
  });

  return (
    data && (
      <div>
        <h1 className="text-white">DATA: {JSON.stringify(data)}</h1>
      </div>
    )
  );
};

Page.navbar = true;
Page.footer = true;

export default Page;

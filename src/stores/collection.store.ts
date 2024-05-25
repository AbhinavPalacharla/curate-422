import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Collection } from "@prisma/client";
import type { IconName } from "@/utils";

type Store = {
  collection: Omit<Collection, "icon"> & { icon?: IconName };
  setCollection: (
    collection: Omit<Collection, "icon"> & { icon?: IconName }
  ) => void;
};

const useCollectionStore = create<Store>()(
  persist(
    (set) => ({
      collection: {
        id: 1,
        name: "The Pile",
        icon: "ReportColumns",
      } as Store["collection"],

      setCollection: (
        collection: Omit<Collection, "icon"> & { icon?: IconName }
      ) => set({ collection }),
    }),
    {
      name: "collection",
    }
  )
);

export { useCollectionStore };

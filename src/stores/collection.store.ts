/// AUTHORS: AP, VD
/// LAST EDITED: 6-3-2024
/// DESCRIPTION: collections.store.ts: Defines a Zustand store for managing collection data with persistence

// Import necessary modules and types from Zustand, Prisma, and utilities
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Collection } from "@prisma/client";
import type { IconName } from "@/utils";

// Define the structure of the store's state and actions
type Store = {
  collection: Omit<Collection, "icon"> & { icon?: IconName }; // Collection state, omitting the original 'icon' and adding an optional 'icon'
  setCollection: (
    collection: Omit<Collection, "icon"> & { icon?: IconName }
  ) => void; // Action to set the collection state
};

// Create a Zustand store with persistence
const useCollectionStore = create<Store>()(
  persist(
    (set) => ({
      // Initial state of the collection
      collection: {
        id: 1,
        name: "The Pile",
        icon: "ReportColumns",
      } as Store["collection"],

      // Action to update the collection state
      setCollection: (
        collection: Omit<Collection, "icon"> & { icon?: IconName }
      ) => set({ collection }),
    }),
    {
      name: "collection", // Name for the persisted state in local storage
    }
  )
);

// Export the useCollectionStore hook for usage in components
export { useCollectionStore };
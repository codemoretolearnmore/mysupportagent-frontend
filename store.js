"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useTicketStore = create(
  persist(
    (set) => ({
      jobId: null,
      setJobId: (newJobId) => set({ jobId: newJobId }),
    }),
    {
      name: "ticket-storage", // Unique storage key
      getStorage: () => localStorage, // Use localStorage to persist state
    }
  )
);

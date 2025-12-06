import { create } from "zustand";
import { persist } from "zustand/middleware";

type Tag = { id: number; title: string };

export type PostDraft = {
  title: string;
  summary: string;
  banner_image: string;
  content: string;
  visibility: "PUBLIC" | "PRIVATE" | "DRAFT" | "SCHEDULED";
  published_at: string | null;
  tags: Tag[];
};

export type PostDraftActions = {
  setField: (field: keyof PostDraft, value: any) => void;
  clear: () => void;
};


type PostDraftStore = PostDraft & PostDraftActions;

export const usePostDraft = create<PostDraftStore>()(
  persist(
    (set) => ({
      title: "",
      summary: "",
      banner_image: "",
      content: "",
      visibility: "PUBLIC",
      published_at: null,
      tags: [],

      setField: (field, value) => set({ [field as keyof PostDraft]: value }),
      clear: () =>
        set({
          title: "",
          summary: "",
          banner_image: "",
          content: "",
          visibility: "PUBLIC",
          published_at: null,
          tags: [],
        }),
    }),
    { name: "post-draft" }
  )
);

import { TPost } from "@/utils/types";
import { create } from "zustand";

interface PostState {
  post: TPost[];
  storePosts: (data: TPost) => void;
}

export const usePostStore = create<PostState>((set) => ({
  post: [],
  storePosts: (data) => set({ post: data }),
}));

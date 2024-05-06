import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { usePosts } from "./store";
import { getDetailPost } from "@/services/api/endpoint/posts";

interface getDetailPostState {
    post: TPosts;
    loading: boolean;
    refreshing: boolean;
    isError: boolean;
    getDetailPost: (id: number) => void;
    refreshDetailPost: () => void;
}

export const useDetailPost = create<getDetailPostState>()(
    persist(
        (set, get) => ({
            post: {
                id: 0,
                userId: 0,
                title: "",
                body: "",
            },
            loading: false,
            refreshing: false,
            isError: false,
            getDetailPost: async (id: number) => {
                set({ loading: true });
                try {
                    const {posts} = usePosts.getState();
                    const find_post = posts.find((item: TPosts) => item?.id === parseInt(id.toString()));
                    if(find_post) {
                        set({ post: find_post, loading: false });
                        return;
                    }
                    const res : TPosts = await getDetailPost(id);
                    set({ post: res });
                } catch (error) {
                    set({ isError: true });
                }
                set({ loading: false });
            },
            refreshDetailPost: () => {
                set({ refreshing: true });
                get().getDetailPost(get().post.id);
                set({ refreshing: false });
            }
        }),
        {
            name: "list-posts-store",
            storage: createJSONStorage(() => localStorage),
        }
    )
);

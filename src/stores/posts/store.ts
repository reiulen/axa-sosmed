import { getListPost } from "@/services/api/endpoint/posts";
import { findMax } from "@/utils/helpers/helper";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface ListPostsState {
    posts: TPosts[];
    loading: boolean;
    refreshing: boolean;
    isError: boolean;
    editPost: (id: number, data: TPostForm) => void;
    addAllPosts: (posts: TPosts[]) => void;
    addPost: (post: TPosts) => void;
    deletePost: (id: number) => void;
    getPosts: (userId: number) => void;
}

export const usePosts = create<ListPostsState>()(
    persist(
        (set, get) => ({
            posts: [],
            loading: false,
            refreshing: false,
            isError: false,
            getPosts: async (userId: number) => {
                set({ loading: true });
                try {
                    if (get().posts.filter((post) => post.userId === parseInt(userId.toString())).length > 0){
                        set({ loading: false });
                        return;
                    }
                    const res: TPosts[] = await getListPost(userId);
                    set({ posts: res });
                } catch (error) {
                    set({ isError: true });
                }
                set({ loading: false });
            },
            addAllPosts: (posts: TPosts[]) => {
                set({ posts });
            },
            addPost: (post: TPosts) => {
                const id = get().posts.length > 0 ? findMax(get().posts) + 1 : 1;
                set((state) => ({
                    posts: [{
                        ...post,
                        id,
                    },
                    ...state.posts]
                }));
            },
            editPost: (id: number, data: TPostForm) => {
                set((state) => ({
                    posts: state.posts.map((post) => {
                        if (post.id === id) {
                            return {
                                ...post,
                                ...data,
                            };
                        }
                        return post;
                    }),
                }));
            },
            deletePost: (id: number) => {
                set((state) => ({
                    posts: state.posts.filter((post) => post.id !== id),
                }));
            },
        }),
        {
            name: "list-posts-store",
            storage: createJSONStorage(() => localStorage),
        }
    )
);

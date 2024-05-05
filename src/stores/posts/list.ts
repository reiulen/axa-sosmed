import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface ListPostsState {
    posts: TPosts[];
    addPost: (post: TPosts) => void;
    deletePost: (id: number) => void;
    getPosts: (userId: number) => void;
}

export const useListPosts = create<ListPostsState>()(
    persist(
        (set, get) => ({
            posts: [],
            getPosts: (userId: number) => {
                // const posts = 
            },
            addAllPosts: (posts: TPosts[]) => {
                set({ posts });
            },
            addPost: (post: TPosts) => {
                const id = Math.max(...get().posts.map((post) => post.id), 0) + 1;
                set((state) => ({
                    posts: [...state.posts, {
                        ...post,
                        id,
                    }]
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

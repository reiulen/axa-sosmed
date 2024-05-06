import { getListComments } from "@/services/api/endpoint/comments";
import { findMax } from "@/utils/helpers/helper";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface CommentsState {
    comments: TComment[];
    loading: boolean;
    refreshing: boolean;
    isError: boolean;
    editComment: (id: number, data: TCommentForm) => void;
    addAllComments: (comments: TComment[]) => void;
    addComment: (comment: TCommentForm) => void;
    deleteComment: (id: number) => void;
    getComments: (postId: number) => void;
}

export const useComments = create<CommentsState>()(
    persist(
        (set, get) => ({
            comments: [],
            loading: false,
            refreshing: false,
            isError: false,
            getComments: async (postId: number) => {
                set({ loading: true });
                try {
                    if (get().comments.filter((comment) => comment.postId === parseInt(postId.toString())).length > 0){
                        set({ loading: false });
                        return;
                    }
                    const res: TComment[] = await getListComments(postId);
                    set({ comments: res });
                } catch (error) {
                    set({ isError: true });
                }
                set({ loading: false });
            },
            addAllComments: (comments: TComment[]) => {
                set({ comments });
            },
            addComment: (comment: TCommentForm) => {
                const id = get().comments.length > 0 ? findMax(get().comments) + 1 : 1;
                set((state) => ({
                    comments: [{
                        ...comment,
                        id,
                    },
                    ...state.comments]
                }));
            },
            editComment: (id: number, data: TCommentForm) => {
                set((state) => ({
                    comments: state.comments.map((comment) => {
                        if (comment.id === id) {
                            return {
                                ...comment,
                                ...data,
                            };
                        }
                        return comment;
                    }),
                }));
            },
            deleteComment: (id: number) => {
                set((state) => ({
                    comments: state.comments.filter((comment) => comment.id !== id),
                }));
            },
        }),
        {
            name: "list-comments-store",
            storage: createJSONStorage(() => localStorage),
        }
    )
);

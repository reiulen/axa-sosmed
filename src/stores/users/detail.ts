import { getDetailUser } from "@/services/api/endpoint/users";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { useUsers } from "./store";

interface ListUsersState {
    user: TUser;
    loading: boolean;
    refreshing: boolean;
    isError: boolean;
    getDetailUser: (id: number) => void;
    refreshDetailUser: () => void;
}

export const useDetailUser = create<ListUsersState>()(
    persist(
        (set, get) => ({
            user: {
                id: 0,
                name: "",
                username: "",
                email: "",
                address: {
                    street: "",
                    suite: "",
                    city: "",
                    zipcode: "",
                    geo: {
                        lat: "",
                        lng: "",
                    },
                },
                phone: "",
                website: "",
                company: {
                    name: "",
                    catchPhrase: "",
                    bs: "",
                },
            },
            loading: false,
            refreshing: false,
            isError: false,
            getDetailUser: async (id: number) => {
                set({ loading: true });
                try {
                    const {users} = useUsers.getState();
                    const find_user = users.find((item: TUser) => item?.id === parseInt(id.toString()));
                    if(find_user) {
                        set({ user: find_user, loading: false });
                        return;
                    }
                    const res : TUser= await getDetailUser(id);
                    set({ user: res });
                } catch (error) {
                    set({ isError: true });
                }
                set({ loading: false });
            },
            refreshDetailUser: () => {
                set({ refreshing: true });
                get().getDetailUser(get().user.id);
                set({ refreshing: false });
            }
        }),
        {
            name: "list-posts-store",
            storage: createJSONStorage(() => localStorage),
        }
    )
);

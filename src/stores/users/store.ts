import { getListUsers } from "@/services/api/endpoint/users";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface ListUsersState {
    users: TUser[];
    loading: boolean;
    refreshing: boolean;
    isError: boolean;
    addAllUsers: (users: TUser[]) => void;
    addUser: (user: TUser) => void;
    deleteUsers: (id: number) => void;
    getUsers: () => void;
    refreshUsers: () => void;
}

export const useUsers = create<ListUsersState>()(
    persist(
        (set, get) => ({
            users: [],
            loading: false,
            refreshing: false,
            isError: false,
            getUsers: async () => {
                set({ loading: true });
                try {
                    if (get().users.length > 0) {
                        set({ loading: false });
                        return;
                    }
                    const res: TUser[] = await getListUsers();
                    set({ users: res });
                } catch (error) {
                    set({ isError: true });
                }
                set({ loading: false });
            },
            addAllUsers: (users: TUser[]) => {
                set({ users });
            },
            addUser: (user: TUser) => {
                const id = Math.max(...get().users.map((user) => user.id), 0) + 1;
                set((state) => ({
                    users: [{
                        ...user,
                        id,
                    }, ...state.users]
                }));
            },
            deleteUsers: (id: number) => {
                set((state) => ({
                    users: state.users.filter((user) => user.id !== id),
                }));
            },
            refreshUsers: async () => {
                set({ refreshing: true });
                await get().getUsers();
                set({ refreshing: false });
            }
        }),
        {
            name: "list-users-store",
            storage: createJSONStorage(() => localStorage),
        }
    )
);

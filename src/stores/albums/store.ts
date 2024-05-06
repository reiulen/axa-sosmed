import { getListAlbums } from "@/services/api/endpoint/albums";
import { create } from "zustand";

interface AlbumsState {
    albums: TAlbums[];
    loading: boolean;
    refreshing: boolean;
    isError: boolean;
    getAlbums: (userId: number) => void;
}

export const useAlbums = create<AlbumsState>()((set, get) => ({
    albums: [],
    loading: false,
    refreshing: false,
    isError: false,
    getAlbums: async (userId: number) => {
        set({ loading: true });
        try {
            if (get().albums.length > 0){
                set({ loading: false });
                return;
            }
            const res: TAlbums[] = await getListAlbums(userId);
            set({ albums: res });
        } catch (error) {
            set({ isError: true });
        }
        set({ loading: false });
    },
}),
);

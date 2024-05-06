import { getDetailAlbum } from "@/services/api/endpoint/albums";
import { create } from "zustand";

interface AlbumsState {
    photos: TAlbums[];
    loading: boolean;
    refreshing: boolean;
    isError: boolean;
    getDetailAlbum: (userId: number) => void;
}

export const useDetailAlbum = create<AlbumsState>()((set) => ({
    photos: [],
    loading: false,
    refreshing: false,
    isError: false,
    getDetailAlbum: async (albumId: number) => {
        set({ loading: true });
        try {
            const res: TAlbums[] = await getDetailAlbum(albumId);
            set({ photos: res });
        } catch (error) {
            set({ isError: true });
        }
        set({ loading: false });
    },
}),
);

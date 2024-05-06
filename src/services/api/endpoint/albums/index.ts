import apiMock from "@/utils/libs/axios-mock";

export const getListAlbums = async (userId: number): Promise<TAlbums[]> => {
  const res = await apiMock.get(`users/${userId}/albums`);
    return res.data;
};

export const getDetailAlbum = async (albumId: number): Promise<TAlbums[]> => {
    const res = await apiMock.get(`albums/${albumId}/photos`);
    return res.data;
}
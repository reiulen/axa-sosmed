import apiMock from "@/utils/libs/axios-mock";

export const getListPost = async (userId: number): Promise<TPosts[]> => {
  const res = await apiMock.get(`users/${userId}/posts`);
    return res.data;
};

export const getDetailPost = async (id: number): Promise<TPosts> => {
  const res = await apiMock.get(`posts/${id}`);
  return res.data;
}

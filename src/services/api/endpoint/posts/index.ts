import apiMock from "@/utils/libs/axios-mock";

export const getListPost = async (userId: number): Promise<TPosts[]> => {
  const res = await apiMock.get(`posts/${userId}`);
    return res.data;
};

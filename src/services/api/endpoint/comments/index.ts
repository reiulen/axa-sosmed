import apiMock from "@/utils/libs/axios-mock";

export const getListComments = async (postId: number): Promise<TComment[]> => {
  const res = await apiMock.get(`posts/${postId}/comments`);
    return res.data;
};

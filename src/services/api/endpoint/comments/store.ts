import apiMock from "@/utils/libs/axios-mock";

export const storeComment = async (postId: number, data: TCommentForm): Promise<TPosts> => {
  const res = await apiMock.post(`post/${postId}/comment`, data);
    return res.data;
};

export const editComment = async (id: number, data: TCommentForm): Promise<TPosts> => {
  const res = await apiMock.put(`comment/${id}`, data);
    return res.data;
};


import apiMock from "@/utils/libs/axios-mock";

export const storePost = async (data: TPostForm): Promise<TPosts> => {
  const res = await apiMock.post(`posts`, data);
    return res.data;
};

export const editPost = async (id: number, data: TPostForm): Promise<TPosts> => {
  const res = await apiMock.put(`posts/${id}`, data);
    return res.data;
};


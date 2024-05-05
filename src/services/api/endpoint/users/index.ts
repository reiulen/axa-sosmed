import apiMock from "@/utils/libs/axios-mock";

export const getListUsers = async (): Promise<TUser[]> => {
  const res = await apiMock.get(`users`);
    return res.data;
};

export const getDetailUser = async (id: number): Promise<TUser> => {
    const res = await apiMock.get(`users/${id}`);
    return res.data;
}

import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { mockMutation } from "@/utils/libs/axios-mock";

type Error = {
  [key: string]: string[];
};

type MutationDelete = {
  id: string;
  onError: (error: AxiosError<{ errors: Error }>) => void;
  onSuccess: (data: { message: string }) => void;
}

type DataDeleteUser = {
  id: string;
  name: string;
  email: string;
}

export const MutationDeletePosts = ({ id, onError, onSuccess }: MutationDelete) => {
  const url = `posts/${id}`;
  const mutationFn = async (data : DataDeleteUser) => {
    return await mockMutation(url, {
      id: data.id,
      name: data.name,
      email: data.email,
    }, "delete");
  };

  const resQuery = useMutation({
    mutationKey: [url],
    mutationFn: mutationFn,
    onError: onError,
    onSuccess: onSuccess
  });

  return resQuery;
};

type MutationAdd = {
  onError: (error: any) => void;
  onSuccess: (data: { message: string }) => void;
}

export const MutationAddPosts = ({ onError, onSuccess }: MutationAdd) => {
  const url = `posts`;
  const mutationFn = async (data : TPostForm) => {
    return await mockMutation(url, {
      title: data.title,
      email: data.body,
      userId: data.userId
    }, "post");
  };

  const resQuery = useMutation({
    mutationKey: [url],
    mutationFn: mutationFn,
    onError: onError,
    onSuccess: onSuccess
  });

  return resQuery;
};
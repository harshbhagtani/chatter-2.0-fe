import {
  ACCESS_CHAT,
  CREATE_GROUP_CHAT,
  USER_LOGIN
} from "@/app/constants/api";
import { callApi } from "@/utils";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useCreateAccessChat = (cb: (data: any) => void) => {
  const url = ACCESS_CHAT;

  return useMutation({
    mutationKey: ["create-chat"],
    mutationFn: async (body: { userId: string }) => {
      return callApi({ url, method: "POST", data: body });
    },
    onSuccess: (data: any) => {
      cb(data);
    }
  });
};

export const useCreateGroupChat = (cb: (data: any) => void) => {
  const url = CREATE_GROUP_CHAT;

  return useMutation({
    mutationKey: ["create-group-chat"],
    mutationFn: async (body: { userIds: string[]; name: string }) => {
      return callApi({ url, method: "POST", data: body });
    },
    onSuccess: (data: any) => {
      cb(data);
    }
  });
};

export const useGetAllChats = () => {
  const url = ACCESS_CHAT;

  return useQuery({
    queryKey: ["all-chats"],
    queryFn: async () => {
      return callApi({ url });
    }
  });
};

export const useDeletechat = (cb: () => void) => {
  const url = ACCESS_CHAT;

  return useMutation({
    mutationKey: ["delete-chat"],
    mutationFn: async (body: { chatId: string }) => {
      return callApi({ url, method: "DELETE", data: body });
    },
    onSuccess: cb
  });
};

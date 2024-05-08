import { FETCH_MESSAGE, SEND_MESSAGE, UPLOAD_FILE } from "@/app/constants/api";
import { callApi } from "@/utils";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useSendMessage = (cb: (data: any) => void) => {
  const url = SEND_MESSAGE;

  return useMutation({
    mutationKey: ["send-message"],
    mutationFn: async (body: { chatId: any; message: string }) => {
      return callApi({ url, method: "POST", data: body });
    },
    onSuccess: (data: any) => {
      cb(data);
    }
  });
};

export const useUploadFile = (cb: (data: any) => void) => {
  const url = UPLOAD_FILE;

  return useMutation({
    mutationKey: ["upload-file"],
    mutationFn: async (body: any) => {
      return callApi({
        url,
        method: "POST",
        data: body,
        content_type: "multipart/form-data"
      });
    },
    onSuccess: (data: any) => {
      cb(data);
    }
  });
};

export const useFetchMessages = (chatId: any, enabled: boolean) => {
  const url = FETCH_MESSAGE;

  return useQuery({
    queryKey: ["messages", chatId],
    queryFn: async () => {
      return callApi({ url, method: "GET", data: { chatId } });
    },
    enabled,
    staleTime: 5 * 1000 * 60
  });
};

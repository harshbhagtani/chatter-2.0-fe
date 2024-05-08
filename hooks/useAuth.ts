import { USER_LOGIN, USER_SIGNUP } from "@/app/constants/api";
import { callApi } from "@/utils";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useUserLogin = (cb: (data: any) => void) => {
  const url = USER_LOGIN;

  return useMutation({
    mutationKey: ["login"],
    mutationFn: async (body: { email: string; password: string }) => {
      return callApi({ url, method: "POST", data: body });
    },
    onSuccess: (data: any) => {
      cb(data);
    }
  });
};

export const useUserSignUp = (cb: (data: any) => void) => {
  const url = USER_SIGNUP;

  return useMutation({
    mutationKey: ["signup"],
    mutationFn: async (body: {
      email: string;
      password: string;
      name: string;
    }) => {
      return callApi({ url, method: "POST", data: body });
    },
    onSuccess: (data: any) => {
      cb(data);
    }
  });
};

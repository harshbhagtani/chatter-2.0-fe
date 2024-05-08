import { BASE_SERVER } from "@/app/constants/config";
import axios, { AxiosResponse } from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

export const getDataFromLocalStorage = (key: string) => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(key);
};

export const setLocalstorageData = (key: string, value: any) => {
  if (typeof window === "undefined") return null;
  localStorage.setItem(key, value);
};

const getHeaders = (content_type: string) => {
  let headers: any = { "Content-Type": content_type };

  if (Cookies.get("token"))
    headers.Authorization = `Bearer ${Cookies.get("token")}`;

  return headers;
};

export const clearDataFromLocalStorage = () => {
  localStorage.clear();
};
export const clearCookies = () => {
  Cookies.remove("token");
};

export const callApi = ({
  url,
  method = "GET",
  data = {},
  timeout = 20000,
  content_type = "application/json",
  responseType,
  axios_args = {}
}: any): Promise<any> => {
  let params = {};
  let payload = {};

  params = method === "GET" ? data : {};
  payload = method !== "GET" ? data : {};

  return new Promise((resolve, reject) => {
    axios({
      baseURL: BASE_SERVER,
      url,
      method,
      timeout,
      responseType,
      params: params,
      data: payload,
      headers: getHeaders(content_type),
      validateStatus: (status) => status >= 200 && status < 300,
      ...axios_args
    })
      .then((response: AxiosResponse) => {
        resolve(response.data);
      })
      .catch((error) => {
        if (error?.response?.status === 401 || error?.code == "ERR_NETWORK") {
          clearDataFromLocalStorage();
          clearCookies();
          window.location.replace("/login");
        }
        toast(error?.response?.data?.error?.message ?? "Something went wrong", {
          type: "error"
        });
        reject(error);
      });
  });
};

export const debounce = (fn: any, wait: number) => {
  let tid: any = null;

  return (...args: any) => {
    if (tid) clearTimeout(tid);
    tid = setTimeout(() => {
      fn(...args);
    }, wait);
  };
};

export function calculateTimeDifference(
  currentDateTime: any,
  pastDateTime: any
) {
  console.log(currentDateTime, pastDateTime);
  const diffInMillis = currentDateTime - pastDateTime;
  const diffInSeconds = Math.floor(diffInMillis / 1000);
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);
  const diffInMonths = Math.floor(diffInDays / 30);

  if (diffInMonths > 0) {
    return `${diffInMonths} ${diffInMonths === 1 ? "month" : "months"}`;
  } else if (diffInDays > 0) {
    return `${diffInDays} ${diffInDays === 1 ? "day" : "days"}`;
  } else if (diffInHours > 0) {
    return `${diffInHours} ${diffInHours === 1 ? "hr" : "hrs"}`;
  } else {
    return `${diffInMinutes} ${diffInMinutes === 1 ? "minute" : "mins"}`;
  }
}

export function downloadFile(url: string, filename: string) {
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.target = "_blank";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function formatDateTime(time: "string") {
  const dt = new Date(time);

  return dt.toLocaleString();
}

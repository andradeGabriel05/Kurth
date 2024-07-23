import axios, { AxiosRequestConfig } from "axios";
import { BASE_URL } from "../utils/system";

export function findPageRequest(page: number, name: string, size = 6, sort = "name") {
    const config: AxiosRequestConfig = {
      method: "GET",
      baseURL: BASE_URL,
      url: "/reply",
      params: {
        page,
        name,
        size,
        sort
      }
    }
    return axios(config);
  }

  export function findByMessageId(page: number, name: string, size = 6, sort = "name", id: number) {
    const config: AxiosRequestConfig = {
      method: "GET",
      baseURL: BASE_URL,
      url: "/reply/message/" + id,
      params: {
        page,
        name,
        size,
        sort
      }
    }
    return axios(config);
  }


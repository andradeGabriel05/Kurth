import axios, { AxiosRequestConfig } from "axios";
import { BASE_URL } from "../utils/system";

export function findPageRequest(page: number, size = 6, sort = "name") {
    const config: AxiosRequestConfig = {
      method: "GET",
      baseURL: BASE_URL,
      url: "/reply",
      params: {
        page,
        size,
        sort
      }
    }
    return axios(config);
  }

  export function findByMessageId(page: number, id: number, size = 6) {
    const config: AxiosRequestConfig = {
      method: "GET",
      baseURL: BASE_URL,
      url: `/reply/message/${id}`,
      params: {
        page,
        size,
      }
    }
    return axios(config);
  }

  export function countReplyMessages(id: number) {
    const config: AxiosRequestConfig = {
      method: "GET",
      baseURL: BASE_URL,
      url: `/reply/message-count/${id}`,
    }
    return axios(config);
  }

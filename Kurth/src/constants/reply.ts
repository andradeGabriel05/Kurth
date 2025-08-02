import axios, { AxiosRequestConfig } from "axios";
import { BASE_URL, TOKEN } from "../utils/system";

export function findPageRequest(page: number, size = 6, sort = "name") {
  const config: AxiosRequestConfig = {
    method: "GET",
    baseURL: BASE_URL,
    url: "/reply",
    params: {
      page,
      size,
      sort,
    },
    headers: { Authorization: `Bearer ${TOKEN}` },
  };
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
    },
    headers: { Authorization: `Bearer ${TOKEN}` },
  };
  return axios(config);
}

export function countReplyMessages(id: number) {
  return axios.get(`${BASE_URL}/message/reply/message-count/${id}`, {
    headers: { Authorization: `Bearer ${TOKEN}` },
  });
}

import axios, { AxiosRequestConfig } from "axios";
import { BASE_URL } from "../utils/system";

export function findPageRequest(page: number, name: string, size = 6, sort = "name") {
  const config: AxiosRequestConfig = {
    method: "GET",
    baseURL: BASE_URL,
    url: "/user",
    params: {
      page,
      name,
      size,
      sort
    }
  }
  return axios(config);
}

export function findById(id: number) {
  return axios.get(`${BASE_URL}/user/${id}`)
}

export function findByUsername(username: string) {
  return axios.get(`${BASE_URL}/user/username/${username}`);
}
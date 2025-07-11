import axios from "axios";
import { BASE_URL } from "../utils/system";

export function findPageRequest(page: number, name: string, size = 10, sort = "name") {
  return axios.get(`${BASE_URL}/user`, {
    params: {
      page,
      name,
      size,
      sort
    }
  });
}

export function findById(id: number) {
  return axios.get(`${BASE_URL}/user/${id}`)
}

export function findByUsername(username: string) {
  return axios.get(`${BASE_URL}/user/username/${username}`);
}
import axios from "axios";
import { BASE_URL, TOKEN } from "../utils/system";

export function findPageRequest(page: number, name: string, size = 10, sort = "name") {
  return axios.get(`${BASE_URL}/user`, {
    params: {
      page,
      name,
      size,
      sort
    },
    headers: { Authorization: `Bearer ${TOKEN}` },
  });
}

export function findById(id: string) {
  return axios.get(`${BASE_URL}/user/${id}`, {
    headers: { Authorization: `Bearer ${TOKEN}` },
  });
}

export function findByUsername(username: string) {
  return axios.get(`${BASE_URL}/user/username/${username}`, {
    headers: { Authorization: `Bearer ${TOKEN}` },
  });
}
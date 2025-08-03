import axios from "axios";
import { BASE_URL, TOKEN } from "../utils/system";

export function findPageRequest(
  page: number,
  name: string,
  size = 10,
  sort = "name"
) {
  return axios.get(`${BASE_URL}/user`, {
    params: {
      page,
      name,
      size,
      sort,
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

export function registerUser(
  name: string,
  username: string,
  email: string,
  createdAt: string,
  password: string,
  bio: string | null = null,
  avatar: string | null = null,
  followers = 0,
  following = 0,
  posts = 0
) {
  const userData = {
    name,
    username,
    email,
    createdAt,
    password,
    bio,
    avatar,
    followers,
    following,
    posts,
  };
  return axios.post(`${BASE_URL}/register`, userData);
}

export function loginUser(username: string, password: string) {
  return axios.post(`${BASE_URL}/login`, { username, password });
}

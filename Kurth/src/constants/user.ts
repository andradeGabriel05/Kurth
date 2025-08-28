import axios from "axios";
import { BASE_URL } from "../utils/system";

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
    withCredentials: true,
  });
}

export function findById(id: string) {
  return axios.get(`${BASE_URL}/user/${id}`, { withCredentials: true });
}

export function findByUsername(username: string) {
  return axios.get(`${BASE_URL}/user/username/${username}`, {
    withCredentials: true,
  });
}

export function registerUser(
  name: string,
  username: string,
  email: string,
  createdAt: string,
  password: string,
  bio: string | null = "",
  avatar:
    | string
    | null = "https://cdn-icons-png.freepik.com/512/8742/8742495.png",
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
  return axios.post(`${BASE_URL}/register`, userData, {
    withCredentials: true,
  });
}

export function loginUser(username: string, password: string) {
  return axios.post(
    `${BASE_URL}/login`,
    { username, password },
    { withCredentials: true }
  );
}

export function updateUser(
  id: string,
  username: string,
  bio: string | null = null,
  avatar: string | null = null
) {
  const userData = {
    username,
    bio,
    avatar,
  };
  return axios.put(`${BASE_URL}/user/${id}`, userData, {
    withCredentials: true,
  });
}

export function following(username: string, page: number) {
  return axios.get(
    `${BASE_URL}/follow/user-following/${username}?page=${page}&size=7`,
    {
      withCredentials: true,
    }
  );
}

export function followers(username: string, page: number) {
  return axios.get(
    `${BASE_URL}/follow/user-followers/${username}?page=${page}&size=7`,
    {
      withCredentials: true,
    }
  );
}

export function followersById(id: string, page: number) {
  return axios.get(
    `${BASE_URL}/follow/user-followers/id/${id}?page=${page}&size=7`,
    {
      withCredentials: true,
    }
  );
}

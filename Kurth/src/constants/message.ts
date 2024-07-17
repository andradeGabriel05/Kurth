import axios from "axios";
import { BASE_URL } from "../utils/system";

export function findAll() {
  return axios.get(`${BASE_URL}/message?size=12`);
}

export function findById(id: number) {
  return axios.get(`${BASE_URL}/message/${id}`);
}

export function findUserMessages(username: string) {
  return axios.get(`${BASE_URL}/message/user_messages/${username}`);
}

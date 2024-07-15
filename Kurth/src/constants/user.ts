import axios from "axios";
import { BASE_URL } from "../utils/system";


export function findAll() {
  return axios.get(`${BASE_URL}/user`);
}

export function findById(id: number) {
  return axios.get(`${BASE_URL}/user/${id}`);
}

export function findByUsername(username: string) {
  return axios.get(`${BASE_URL}/user/username/${username}`);
}
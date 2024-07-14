import axios from "axios";
import { BASE_URL } from "../utils/system";


export function findAll() {
  return axios.get(`${BASE_URL}/user`);
}

export function findById(id: number) {
  return axios.get(`${BASE_URL}/user/${id}`);
}
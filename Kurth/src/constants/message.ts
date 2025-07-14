import axios from "axios";
import { BASE_URL } from "../utils/system";

export function findAll() {
  return axios.get(`${BASE_URL}/message?page=0&size=20&sort=id,desc`);
}

export function findById(id: number) {
  return axios.get(`${BASE_URL}/message/${id}`);
}

export function findUserMessages(username: string) {
  return axios.get(`${BASE_URL}/message/user_messages/${username}?page=0&size=12&sort=id,desc`);
}

export function findAllMessagesWithImage() {

  return axios.get(`${BASE_URL}/message/images-details`);
}

export function findAllUserFollowingMessages(followerId: number) {
  return axios.get(`${BASE_URL}/message/user-following-messages/${followerId}`);
}

export function findReplies(id: number) {
  return axios.get(`${BASE_URL}/message/find-replies/${id}?page=0&size=6&sort=id,asc`);
}

import axios from "axios";
import { BASE_URL } from "../utils/system";

const paginationSize: number = 7;

export function findAll(actualPage: number) {
  return axios.get(`${BASE_URL}/message?page=${actualPage}&size=${paginationSize}&sort=postedAt,desc`);
}

export function findById(id: number) {
  return axios.get(`${BASE_URL}/message/${id}`);
}

export function findUserMessages(username: string, actualPage: number = 0) {
  return axios.get(`${BASE_URL}/message/user_messages/${username}?page=${actualPage}&size=${paginationSize}&sort=postedAt,desc`);
}

export function findAllMessagesWithImage() {

  return axios.get(`${BASE_URL}/message/images-details`);
}

export function findAllUserFollowingMessages(followerId: number, actualPage: number = 0) {
  return axios.get(`${BASE_URL}/message/user-following-messages/${followerId}?page=${actualPage}&size=6&sort=postedAt,desc`);
}

export function findReplies(id: number, actualPage: number = 0) {
  return axios.get(`${BASE_URL}/message/find-replies/${id}?page=${actualPage}&size=${paginationSize}&sort=postedAt,desc`);
}

export function findLikedMessages(username: string, actualPage: number = 0) {
  return axios.get(`${BASE_URL}/likecount/user/${username}?page=${actualPage}&size=${paginationSize}&sort=likedAt,desc`);
}

export function deleteMessage(id: number) {
  return axios.delete(`${BASE_URL}/message/${id}`);
}

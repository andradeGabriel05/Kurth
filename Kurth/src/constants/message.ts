import axios from "axios";
import { BASE_URL, TOKEN } from "../utils/system";

const paginationSize: number = 7;

export function findAll(actualPage: number) {
  return axios.get(
    `${BASE_URL}/message?page=${actualPage}&size=${paginationSize}&sort=postedAt,desc`,
    {
      headers: { Authorization: `Bearer ${TOKEN}` },
    }
  );
}

export function findById(id: number) {
  return axios.get(`${BASE_URL}/message/${id}`, {
    headers: { Authorization: `Bearer ${TOKEN}` },
  });
}

export function findUserMessages(username: string, actualPage: number = 0) {
  return axios.get(
    `${BASE_URL}/message/user_messages/${username}?page=${actualPage}&size=${paginationSize}&sort=postedAt,desc`,
    {
      headers: { Authorization: `Bearer ${TOKEN}` },
    }
  );
}

export function findAllMessagesWithImage() {
  return axios.get(`${BASE_URL}/message/images-details`, {
    headers: { Authorization: `Bearer ${TOKEN}` },
  });
}

export function findAllUserFollowingMessages(
  followerId: number,
  actualPage: number = 0
) {
  return axios.get(
    `${BASE_URL}/message/user-following-messages/${followerId}?page=${actualPage}&size=6&sort=postedAt,desc`,
    {
      headers: { Authorization: `Bearer ${TOKEN}` },
    }
  );
}

export function findReplies(id: number, actualPage: number = 0) {
  return axios.get(
    `${BASE_URL}/message/find-replies/${id}?page=${actualPage}&size=${paginationSize}&sort=postedAt,desc`,
    {
      headers: { Authorization: `Bearer ${TOKEN}` },
    }
  );
}

export function findLikedMessages(username: string, actualPage: number = 0) {
  return axios.get(
    `${BASE_URL}/likecount/user/${username}?page=${actualPage}&size=${paginationSize}&sort=likedAt,desc`,
    {
      headers: { Authorization: `Bearer ${TOKEN}` },
    }
  );
}

export function deleteMessage(id: number) {
  return axios.delete(`${BASE_URL}/message/${id}`, {
    headers: { Authorization: `Bearer ${TOKEN}` },
  });
}

import axios from "axios";
import { BASE_URL, currentDate, TOKEN } from "../utils/system";

const paginationSize: number = 7;

export function postMessage(
  message: string,
  imageUrl: string | null,
  userId: string
) {
  return axios.post(
    `${BASE_URL}/message`,
    {
      message,
      postedAt: currentDate,
      image: imageUrl ? `http://localhost:8080/${imageUrl}` : null,
      likeCount: 0,
      user: { id: userId },
    },
    {
      headers: { Authorization: `Bearer ${TOKEN}` },
    }
  );
}

export function postReply(message: string, parentId: number, userId: string) {
  return axios.post(
    `${BASE_URL}/message`,
    {
      message,
      postedAt: currentDate,
      likeCount: 0,
      parent: { id: parentId },
      isReply: true,
      user: { id: userId },
    },
    {
      headers: { Authorization: `Bearer ${TOKEN}` },
    }
  );
}

export function saveImageLocal(formData: FormData) {
  return axios.post(`${BASE_URL}/message/upload-image`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${TOKEN}`,
    },
  });
}

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

//like section

export function likeMessageLikeCount(messageId: number, userId: string) {
  return axios.post(
    `${BASE_URL}/likecount`,
    {
      user: { id: userId },
      post: { id: messageId },
    },
    {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    }
  );
}

export function increaseLikeMessage(messageId: number) {
  return axios.put(
    `${BASE_URL}/message/${messageId}/like-count`,
    {},
    {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
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

export function checkIfUserLikedMessage(userId: string, messageId: number) {
  return axios.get(
    `${BASE_URL}/likecount/user/${userId}/message/${messageId}`,
    {
      headers: { Authorization: `Bearer ${TOKEN}` },
    }
  );
}

export function removeLike(messageId: number) {
  return axios.delete(`${BASE_URL}/likecount/remove/${messageId}`, {
    headers: { Authorization: `Bearer ${TOKEN}` },
  });
}

export function removeLikeFromMessage(messageId: number) {
  return axios.put(
    `${BASE_URL}/message/${messageId}/like-count-removing`,
    {},
    {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    }
  );
}
export function deleteMessage(id: number) {
  return axios.delete(`${BASE_URL}/message/${id}`, {
    headers: { Authorization: `Bearer ${TOKEN}` },
  });
}

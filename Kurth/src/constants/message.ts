import axios from "axios";
import { BASE_URL, currentDate } from "../utils/system";

const paginationSize: number = 7;

export function postMessage(
  message: string,
  imageUrl: string | null,
  userId?: string
) {
  return axios.post(
    `${BASE_URL}/message`,
    {
      message,
      postedAt: currentDate,
      image: imageUrl ? `http://localhost:8080/${imageUrl}` : null,
      likeCount: 0,
    },
    {
      withCredentials: true,
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
      withCredentials: true,
    }
  );
}

export async function saveImageLocal(formData: FormData) {
  return await axios.post(`${BASE_URL}/message/upload-image`, formData, {
    withCredentials: true,

    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

export function findAll(actualPage: number) {
  return axios.get(
    `${BASE_URL}/message?page=${actualPage}&size=${paginationSize}&sort=postedAt,desc`,
    {
      withCredentials: true,
    }
  );
}

export function findById(id: number) {
  return axios.get(`${BASE_URL}/message/${id}`, {
    withCredentials: true,
  });
}

export function findUserMessages(username: string, actualPage: number = 0) {
  return axios.get(
    `${BASE_URL}/message/user_messages/${username}?page=${actualPage}&size=${paginationSize}&sort=postedAt,desc`,
    {
      withCredentials: true,
    }
  );
}

export function findAllMessagesWithImage() {
  return axios.get(`${BASE_URL}/message/images-details`, {
    withCredentials: true,
  });
}

export function findAllUserFollowingMessages(
  followerId: number,
  actualPage: number = 0
) {
  return axios.get(
    `${BASE_URL}/message/user-following-messages/${followerId}?page=${actualPage}&size=6&sort=postedAt,desc`,
    {
      withCredentials: true,
    }
  );
}

export function findReplies(id: number, actualPage: number = 0) {
  return axios.get(
    `${BASE_URL}/message/find-replies/${id}?page=${actualPage}&size=${paginationSize}&sort=postedAt,desc`,
    {
      withCredentials: true,
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
      withCredentials: true,
    }
  );
}

export function increaseLikeMessage(messageId: number) {
  return axios.put(
    `${BASE_URL}/message/${messageId}/like-count`,
    {},
    {
      withCredentials: true,
    }
  );
}

export function findLikedMessages(username: string, actualPage: number = 0) {
  return axios.get(
    `${BASE_URL}/likecount/user/${username}?page=${actualPage}&size=${paginationSize}&sort=likedAt,desc`,
    {
      withCredentials: true,
    }
  );
}

export function checkIfUserLikedMessage(userId: string, messageId: number) {
  return axios.get(
    `${BASE_URL}/likecount/user/${userId}/message/${messageId}`,
    {
      withCredentials: true,
    }
  );
}

export function removeLike(messageId: number) {
  return axios.delete(`${BASE_URL}/likecount/remove/${messageId}`, {
    withCredentials: true,
  });
}

export function removeLikeFromMessage(messageId: number) {
  return axios.put(
    `${BASE_URL}/message/${messageId}/like-count-removing`,
    {},
    {
      withCredentials: true,
    }
  );
}
export function deleteMessage(id: number) {
  return axios.delete(`${BASE_URL}/message/${id}`, {
    withCredentials: true,
  });
}

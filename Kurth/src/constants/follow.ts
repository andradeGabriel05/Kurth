import axios from "axios";
import { BASE_URL, TOKEN } from "../utils/system";

export function followUser(userFollowerId: string, userFollowingId: string) {
  return axios.post(
    `${BASE_URL}/follow`,
    {
      userFollowerId,
      userFollowingId,
    },
    {
      headers: { Authorization: `Bearer ${TOKEN}` },
    }
  );
}

export function checkFollowStatus(
  userFollowerId: string,
  userFollowingId: string
) {
  return axios.get(
    `${BASE_URL}/follow/checkfollow/${userFollowerId}/${userFollowingId}`,
    {
      headers: { Authorization: `Bearer ${TOKEN}` },
    }
  );
}

export function removeFollow(followId: string) {
  return axios.delete(`${BASE_URL}/follow/remove-follow/${followId}`, {
    headers: { Authorization: `Bearer ${TOKEN}` },
  });
}

export function increaseUserFollowing(userId: string) {
  return axios.put(
    `${BASE_URL}/user/${userId}/update-following`,
    {},
    {
      headers: { Authorization: `Bearer ${TOKEN}` },
    }
  );
}
export function increaseUserFollower(userId: string) {
  return axios.put(
    `${BASE_URL}/user/${userId}/update-follower`,
    {},
    {
      headers: { Authorization: `Bearer ${TOKEN}` },
    }
  );
}

export function decreaseUserFollowing(userId: string) {
  return axios.put(
    `${BASE_URL}/user/${userId}/update-remove-following`,
    {},
    {
      headers: { Authorization: `Bearer ${TOKEN}` },
    }
  );
}

export function decreaseUserFollower(userId: string) {
  return axios.put(
    `${BASE_URL}/user/${userId}/update-remove-follower`,
    {},
    {
      headers: { Authorization: `Bearer ${TOKEN}` },
    }
  );
}

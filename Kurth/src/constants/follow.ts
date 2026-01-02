import axios from "axios";
import { BASE_URL } from "../utils/system";

export function followUser(userFollowerId: string, userFollowingId: string) {
  return axios.post(
    `${BASE_URL}/follow`,
    {
      userFollower: { id: userFollowerId },
      userFollowing: { id: userFollowingId },
    },
    {
      withCredentials: true,
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
      withCredentials: true,
    }
  );
}

export function removeFollow(followId: string) {
  return axios.delete(`${BASE_URL}/follow/remove-follow/${followId}`, {
    withCredentials: true,
  });
}

export function increaseUserFollowing() {
  return axios.put(
    `${BASE_URL}/user/update-following`,
    {},
    {
      withCredentials: true,
    }
  );
}
export function increaseUserFollower(userId: string) {
  return axios.put(
    `${BASE_URL}/user/${userId}/update-follower`,
    {},
    {
      withCredentials: true,
    }
  );
}

export function decreaseUserFollowing() {
  return axios.put(
    `${BASE_URL}/user/update-remove-following`,
    {},
    {
      withCredentials: true,
    }
  );
}

export function decreaseUserFollower(userId: string) {
  return axios.put(
    `${BASE_URL}/user/${userId}/update-remove-follower`,
    {},
    {
      withCredentials: true,
    }
  );
}

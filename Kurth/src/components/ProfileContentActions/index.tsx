// import { FaEnvelope } from "react-icons/fa6";
// import "./style.scss";
// import { UserDTO } from "../../models/user";
// import { useEffect, useState } from "react";
// import * as UserService from "../../constants/user";
// import { useNavigate, useParams } from "react-router-dom";
// import axios from "axios";
// import { BASE_URL } from "../../utils/system";
// import { IncreaseFollowers } from "../ProfileContentDetails";

import axios from "axios";
import { BASE_URL } from "../../utils/system";
import { useEffect, useState } from "react";

// type Props = {
//   user: UserDTO;
// };

export default function ProfileContentActions(userLoggedInId) {
  //   const params = useParams();
  //   const [userId, setUserId] = useState<UserDTO>();

  //   const [followers, setFollowers] = useState<UserDTO>();
  //   useEffect(() => {
  //     UserService.findByUsername(params.username as string)
  //       .then((response) => {
  //         console.log(response.data.id);
  //         setUserId(response.data.id);
  //         setFollowers(response.data.followers);
  //       })
  //       .catch((error) => {
  //         console.error("Error:", error.response.data);
  //       });
  //   }, []);

  //   function handleEditProfile() {
  //     console.log("OI");
  //   }

  //   // const [followers, setFollowers] = useState<UserDTO>();
  //   // const [textButton, setTextButton] = useState<string>("");

  async function handleFollowOnSearchPage(event: any) {
    event.preventDefault();

    console.log("Followed", userLoggedInId.userId);
    await axios
      .post(`${BASE_URL}/follow`, {
        userFollowerId: userLoggedInId.userLoggedInId,
        userFollowingId: userLoggedInId.userId,
      })
      .then((response) => {
        console.log("Followed:", response.data);
        window.location.reload(); // <- this
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  async function handleUnfollowOnSearchPage(event: any) {
    event.preventDefault();

    const response = await axios.get(
      `${BASE_URL}/follow/checkfollow/${userLoggedInId.userLoggedInId}/${userLoggedInId.userId}`
    );
    console.log(response.data.id);
    await axios.put(
      `${BASE_URL}/user/${userLoggedInId.userId}/update-remove-follower`
    ),
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };
    await axios.put(
      `${BASE_URL}/user/${userLoggedInId.userLoggedInId}/update-remove-following`
    ),
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };

    if (response.data.id) {
      await axios.delete(
        `${BASE_URL}/follow/remove-follow/${response.data.id}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
    }

    window.location.reload();
  }

  const [isFollowing, setIsFollowing] = useState(false);
  useEffect(() => {
    axios
      .get(
        `${BASE_URL}/follow/checkfollow/${userLoggedInId.userLoggedInId}/${userLoggedInId.userId}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      )
      .then((response) => {
        console.log(response.data);
        // if (element.userFollowingId === userLoggedInId.userId) {
        setIsFollowing(true);
        console.log(isFollowing);
        // }
      })
      .catch((error) => {
        setIsFollowing(false);
        console.log(isFollowing);
        console.error("Error:", error.response.data);
      });
  }, []);

  return (
    <div>
      {isFollowing ? (
        <form action="" onSubmit={handleUnfollowOnSearchPage}>
          <button id="buttonFollow" type="submit">
            Unfollow
          </button>
        </form>
      ) : (
        <form action="" onSubmit={handleFollowOnSearchPage}>
          <button id="buttonFollow" type="submit">
            Follow
          </button>
        </form>
      )}
    </div>
  );
}

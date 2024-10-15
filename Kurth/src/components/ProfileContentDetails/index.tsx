import { useEffect, useState } from "react";
import { UserDTO } from "../../models/user";
import { BASE_URL } from "../../utils/system";
import "./style.scss";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { FaEnvelope } from "react-icons/fa6";
import * as UserService from "../../constants/user";

type Props = {
  user: UserDTO;
};

// this freaked me out because
export default function ProfileContentDetails({ user }: Props) {
  const userLoggedIn = parseInt(localStorage.getItem("user_id") || "0");

  const navigate = useNavigate();
  const params = useParams();
  const [userId, setUserId] = useState<UserDTO>();

  useEffect(() => {
    UserService.findByUsername(params.username as string)
      .then((response) => {
        console.log(response.data.id);
        setUserId(response.data.id);
        setFollowers(response.data.followers);
      })
      .catch((error) => {
        console.error("Error:", error.response.data);
      });
  }, [params.username]);

  // check if user is following
  const [isFollowing, setIsFollowing] = useState(false);
  const [idFollow, setIdFollow] = useState();
  useEffect(() => {
    axios
      .get(`${BASE_URL}/follow/checkfollow/${userLoggedIn}/${userId}`)
      .then((response) => {
        const userFollowing = response.data.userFollowingId;
        const userFollower = response.data.userFollowerId;
        setIsFollowing(
          userFollowing === userId && userFollower === userLoggedIn
        );
        setIdFollow(response.data.id);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error:", error.response.data);
      });
  }, [userLoggedIn, userId]);

  const [followers, setFollowers] = useState<UserDTO>(user.followers);

  // this is for follow and unfollow users
  // if you double click, this will not work
  // jesus...

  async function handleFollow(event) {
    event.preventDefault();
    if (!userLoggedIn) {
      return navigate("/login");
    }
    try {
      if (!isFollowing) {
        // seguindo usuário -> following user

        console.log("62 ->", userLoggedIn, userId);
        await axios.post(`${BASE_URL}/follow`, {
          userFollowerId: userLoggedIn,
          userFollowingId: userId,
        });
        await axios.put(`${BASE_URL}/user/${userId}/update-follower`);
        await axios.put(`${BASE_URL}/user/${userLoggedIn}/update-following`);

        // atualizar o número de seguidores -> updtate numbers of followers
        setFollowers((prevFollowers) => prevFollowers + 1);
        setIsFollowing(true); // atualiza o texto do botao para 'parar de seguir' -> update button text to 'unfollow'
        console.log("Followed");
      } else {
        const response = await axios.get(
          `${BASE_URL}/follow/checkfollow/${userLoggedIn}/${userId}`
        );

        // Deixar de seguir usuário -> unfollow user
        await axios.put(`${BASE_URL}/user/${userId}/update-remove-follower`);
        await axios.put(
          `${BASE_URL}/user/${userLoggedIn}/update-remove-following`
        );

        if (response.data.id) {
          await axios.delete(
            `${BASE_URL}/follow/remove-follow/${response.data.id}`
          );
        }

        setFollowers((prevFollowers) => prevFollowers - 1);
        setIsFollowing(false); // atualizar o texto do botao para 'seguir' -> update button text to 'follow'

        console.log("Unfollowed");
      }
    } catch (error) {
      window.alert("Error in follow/unfollow request");
      console.error("Error in follow/unfollow request:", error);
      window.location.reload();
    }
  }
  return (
    <div className="profile-content-details">
      <span>
        {followers}
        <span className="profile-content-details-text"> Followers</span>
      </span>
      <span>
        {user.following}
        <span className="profile-content-details-text"> Following</span>
      </span>

      <div className="profile-content-actions">
        {/* if in your profile */}
        {userId && userId == userLoggedIn ? (
          <button>Edit profile</button>
        ) : (
          // follow and unfollow text
          <form method="post" onSubmit={handleFollow}>
            {isFollowing ? (
              <button type="submit">Unfollow</button>
            ) : (
              <button type="submit">Follow</button>
            )}
          </form>
        )}
        <button>
          <FaEnvelope className="reactIcon" />
        </button>
      </div>
    </div>
  );
}

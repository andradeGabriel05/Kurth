import { useEffect, useState } from "react";
import { UserDTO } from "../../models/user";
import { BASE_URL, TOKEN } from "../../utils/system";
import "./style.scss";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { FaEnvelope } from "react-icons/fa6";
import * as UserService from "../../constants/user";
import NavigationLink from "../NavigationLink";

type Props = {
  user: UserDTO;
};

// this freaked me out because
export default function ProfileContentDetails({ user }: Props) {
  const userLoggedIn = localStorage.getItem("user_id") || "";
  const userLoggedInUsername = localStorage.getItem("username") || "";

  const navigate = useNavigate();
  const params = useParams();
  const [userId, setUserId] = useState<string>(user.id);

  const [followers, setFollowers] = useState<number>(user.followers);
  useEffect(() => {
    UserService.findByUsername(params.username as string)
      .then((response) => {
        const fetchedId = response.data.id;
        setUserId(fetchedId);
        setFollowers(response.data.followers);
      })
      .catch((error) => {
        console.error("Error:", error.response.data);
      });
  }, [params.username, followers]);

  // check if user is following
  const [isFollowing, setIsFollowing] = useState(false);
  const [idFollow, setIdFollow] = useState();
  useEffect(() => {
    console.log(userLoggedIn);
    console.log(params.username);
    if (userId !== undefined && userLoggedIn !== userId) {
      axios
        .get(`${BASE_URL}/follow/checkfollow/${userLoggedIn}/${userId}`, {
          headers: { Authorization: `Bearer ${TOKEN}` },
        })
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
    }
  }, [userLoggedIn, userId]);

  // this is for follow and unfollow users
  // if you double click, this will not work
  // jesus...

  async function handleFollow(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!userLoggedIn) {
      return navigate("/login");
    }
    try {
      if (!isFollowing) {
        // seguindo usuário -> following user

        console.log("62 ->", userLoggedIn, userId);
        await axios.post(
          `${BASE_URL}/follow`,
          {
            userFollowerId: userLoggedIn,
            userFollowingId: userId,
          },
          {
            headers: { Authorization: `Bearer ${TOKEN}` },
          }
        );
        await axios.put(
          `${BASE_URL}/user/${userId}/update-follower`,
          {},
          {
            headers: { Authorization: `Bearer ${TOKEN}` },
          }
        );
        await axios.put(
          `${BASE_URL}/user/${userLoggedIn}/update-following`,
          {},
          {
            headers: { Authorization: `Bearer ${TOKEN}` },
          }
        );

        // atualizar o número de seguidores -> updtate numbers of followers
        setFollowers((prevFollowers) => prevFollowers + 1);
        setIsFollowing(true); // atualiza o texto do botao para 'parar de seguir' -> update button text to 'unfollow'
        console.log("Followed");
      } else {
        const response = await axios.get(
          `${BASE_URL}/follow/checkfollow/${userLoggedIn}/${userId}`,
          {
            headers: { Authorization: `Bearer ${TOKEN}` },
          }
        );

        // Deixar de seguir usuário -> unfollow user
        await axios.put(
          `${BASE_URL}/user/${userId}/update-remove-follower`,
          {},
          {
            headers: { Authorization: `Bearer ${TOKEN}` },
          }
        );

        await axios.put(
          `${BASE_URL}/user/${userLoggedIn}/update-remove-following`,
          {},
          {
            headers: { Authorization: `Bearer ${TOKEN}` },
          }
        );

        if (response.data.id) {
          await axios.delete(
            `${BASE_URL}/follow/remove-follow/${response.data.id}`,
            {
              headers: { Authorization: `Bearer ${TOKEN}` },
            }
          );
          setFollowers((prevFollowers) => prevFollowers - 1);
          setIsFollowing(false); // atualizar o texto do botao para 'seguir' -> update button text to 'follow'

          console.log("Unfollowed");
        }
      }
    } catch (error) {
      window.alert("Error in follow/unfollow request");
      console.error("Error in follow/unfollow request:", error);
      window.location.reload();
    }
  }
  return (
    <>
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

      <div className="other-pages-user-page">
        <NavigationLink link={`profile/${params.username}`} profile={true}>
          {["Posts"]}
        </NavigationLink>
        <NavigationLink
          link={`profile/${params.username}/likes`}
          profile={true}
        >
          {["Likes"]}
        </NavigationLink>
      </div>
    </>
  );
}

import { FaEnvelope } from "react-icons/fa6";
import "./style.scss";
import { UserDTO } from "../../models/user";
import { useEffect, useState } from "react";
import * as UserService from "../../constants/user";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../utils/system";

export default function ProfileContentActions() {
  const navigate = useNavigate();
  const params = useParams();
  const [userId, setUserId] = useState<UserDTO>();
  useEffect(() => {
    UserService.findByUsername(params.username as string)
      .then((response) => {
        console.log(response.data.id);
        setUserId(response.data.id);
      })
      .catch((error) => {
        console.error("Error:", error.response.data);
      });
  }, []);

  function handleEditProfile() {
    console.log("OI");
  }

  // const [followers, setFollowers] = useState<UserDTO>();
  const [responseStatus, setResponseStatus] = useState<number>(1);

  async function handleFollow(event) {
    event.preventDefault();

    try {
      const response = await axios.post(`${BASE_URL}/follow`, {
        userFollowerId: localStorage.getItem("user_id"),
        userFollowingId: userId,
      });

      setResponseStatus(response.status);
    } catch (error) {
      console.error("Error in follow request:", error);
      setResponseStatus(1);

    }
  }

  return (
    <div className="profile-content-actions">
{/* if in your profile */}
      {userId && userId == localStorage.getItem("user_id") ? (
        <button onClick={handleEditProfile}>Edit profile</button>
      ) : (

        // follow and unfollow
        <form method="post" onSubmit={handleFollow}>
          {responseStatus && responseStatus == 1 ? (
            <button type="submit">Follow</button>
          ) : (
            <button type="submit">Following</button>
          )}
        </form>
      )}
      <button>
        <FaEnvelope className="reactIcon" />
      </button>
    </div>
  );
}

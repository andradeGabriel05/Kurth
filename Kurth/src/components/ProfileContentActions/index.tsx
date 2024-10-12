import { FaEnvelope } from "react-icons/fa6";
import "./style.scss";
import { UserDTO } from "../../models/user";
import { useEffect, useState } from "react";
import * as UserService from "../../constants/user";
import { useNavigate, useParams } from "react-router-dom";

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

  function handleFollow() {
    // navigate to follow page
    navigate(`/profile/${params.username}/follow`);
    console.log("Follow button clicked");
  }

  return (
    <div className="profile-content-actions">
      {userId && userId == localStorage.getItem("user_id") ? (
        <button onClick={handleEditProfile}>Edit profile</button>
      ) : (
        <form action="" onSubmit={handleFollow}>
          <button type="submit">Follow</button>
        </form>
      )}
      <button>
        <FaEnvelope className="reactIcon" />
      </button>
    </div>
  );
}

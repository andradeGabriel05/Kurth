import { useEffect, useState } from "react";
import { UserDTO } from "../../../../models/user";
import ProfileHeader from "../../../../components/ProfileHeader";
import ProfileContentDetails from "../../../../components/ProfileContentDetails";
import { useParams } from "react-router-dom";
import * as UserService from "../../../../constants/user";

export default function Likes() {
  const params = useParams();

  const [user, setUser] = useState<UserDTO>();
  useEffect(() => {
    UserService.findByUsername(params.username as string)
      .then((response) => {
        console.log(response.data);
        setUser(response.data);
      })
      .catch((error) => {
        console.error("Error:", error.response.data);
      });
  }, []);
  return (
    <div className="profile-container">
      {user && <ProfileHeader user={user} />}
      <div className="profile-content">
        {user && <ProfileContentDetails user={user} />}
      </div>
    </div>
  );
}

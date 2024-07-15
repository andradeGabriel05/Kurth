import "./style.scss";
import ProfileContentActions from "../../../components/ProfileContentActions";
import ProfileContentDetails from "../../../components/ProfileContentDetails";
import ProfileHeader from "../../../components/ProfileHeader";
import { useParams } from "react-router-dom";
import * as userConst from "../../../constants/user";
import { UserDTO } from "../../../models/user";
import { useEffect, useState } from "react";
// import { user } from "../../constants/";

export default function Profile() {
  const params = useParams();

  const [user, setUser] = useState<UserDTO>();
  useEffect(() => {
    userConst
      .findByUsername(params.username as string)
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
        {user && <ProfileContentActions />}
      </div>
    </div>
  );
}

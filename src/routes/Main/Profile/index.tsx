import "./style.scss";
import ProfileContentActions from "../../../components/ProfileContentActions";
import ProfileContentDetails from "../../../components/ProfileContentDetails";
import ProfileHeader from "../../../components/ProfileHeader";
import { useParams } from "react-router-dom";
import * as userConst from "../../../constants/user";
// import { user } from "../../constants/";

export default function Profile() {
  const params = useParams();
  const username = userConst.findByUsername(params.username as string);

  return (
    <div className="profile-container">
      {username && <ProfileHeader user={username} />}
      <div className="profile-content">
        {username && <ProfileContentDetails user={username} />}
        <ProfileContentActions />
      </div>
    </div>
  );
}

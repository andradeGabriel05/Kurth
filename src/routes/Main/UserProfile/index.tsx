import "./style.scss";
import ProfileContentActions from "../../../components/ProfileContentActions";
import ProfileContentDetails from "../../../components/ProfileContentDetails";
import ProfileHeader from "../../../components/ProfileHeader";
import { UserDTO } from "../../../models/user";
// import { user } from "../../constants/";

type Props = {
  user: UserDTO;
};

export default function UserProfile({ user }: Props) {

  return (
    <>
      <div className="profile-container">
        <ProfileHeader user={user} />
        <div className="profile-content">
          <ProfileContentDetails user={user} />
          <ProfileContentActions />
        </div>
      </div>
    </>
  );
}

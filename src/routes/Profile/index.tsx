import Aside from "../../components/Aside";
import ProfileContentActions from "../../components/ProfileContentActions";
import ProfileContentDetails from "../../components/ProfileContentDetails";
import ProfileHeader from "../../components/ProfileHeader";
import { UserDTO } from "../../models/user";
import "./style.scss";

type Props = {
  user: UserDTO;
};

export default function Profile({ user }: Props) {
  return (
    <>
      <div className="container">
        <Aside />
        <div className="profile-container">
          <ProfileHeader user={user} />
          <div className="profile-content">
            <ProfileContentDetails user={user} />
            <ProfileContentActions />
          </div>
        </div>
      </div>
    </>
  );
}

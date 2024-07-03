import { UserDTO } from "../../models/user";

export default function ProfileContentDetails({ user }: { user: UserDTO }) {
  return (
    <div className="profile-content-details">
      <span>
        {user.followers}{" "}
        <span className="profile-content-details-text">Followers</span>
      </span>
      <span>
        {user.following}{" "}
        <span className="profile-content-details-text">Following</span>
      </span>
    </div>
  );
}

import { UserDTO } from "../../models/user";

type Props = {
  user: UserDTO;
};

export default function ProfileHeader({ user }: Props) {
  return (
    <div className="profile-header">
      <div className="profile-image">
        <img src={user.avatar === null ? "https://cdn-icons-png.freepik.com/512/8742/8742495.png" : user.avatar} alt={user.username} />
      </div>
      <div className="profile-details">
        <span className="profile-details-name">{user.name}</span>
        <span className="profile-details-username">@{user.username}</span>
        <span>{user.bio}</span>
      </div>
    </div>
  );
}

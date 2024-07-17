import "./style.scss";
import ProfileContentActions from "../../../components/ProfileContentActions";
import ProfileContentDetails from "../../../components/ProfileContentDetails";
import ProfileHeader from "../../../components/ProfileHeader";
import { UserDTO } from "../../../models/user";
import { useEffect, useState } from "react";
import { MessageDTO } from "../../../models/message";
import * as MessageService from "../../../constants/message";
import { useParams } from "react-router-dom";
// import { user } from "../../constants/";

type Props = {
  user: UserDTO;
};

export default function UserProfile({ user }: Props) {


  // const [message, setMessage] = useState<MessageDTO>();

  // useEffect(() => {
  //   MessageService.findUserMessages().then((response) => {
  //     console.log(response.data);
  //     setMessage(response.data);
  //   });
  // }, []);

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

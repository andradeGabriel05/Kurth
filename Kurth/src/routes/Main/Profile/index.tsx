import "./style.scss";
import ProfileContentActions from "../../../components/ProfileContentActions";
import ProfileContentDetails from "../../../components/ProfileContentDetails";
import ProfileHeader from "../../../components/ProfileHeader";
import { Link, useParams } from "react-router-dom";
import * as UserService from "../../../constants/user";
import * as MessageService from "../../../constants/message";
import { UserDTO } from "../../../models/user";
import { useEffect, useState } from "react";
import { MessageDTO } from "../../../models/message";
import MessagePosted from "../../../components/MessagePosted";
import Reaction from "../../../components/Reaction";
// import { user } from "../../constants/";

export default function Profile() {
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

  const [message, setMessage] = useState<MessageDTO[]>([]);
  useEffect(() => {
    MessageService.findUserMessages(params.username as string)
      .then((response) => {
        console.log(response.data);
        setMessage(response.data);
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
        {/* {user && <ProfileContentActions user={user}/>} */}
      </div>
      {message && message.length === 0 && (
        <div className="no-message">No messages found for this user.</div>
      )}
      {message.map((message) => (
        <div className="message-posted profile-message-posted">
          <Link to={`/${message.user.username}/posts/${message.id}`}>
            <MessagePosted key={message.id} message={message} />
          </Link>
          <Reaction message={message} />
        </div>
      ))}
    </div>
  );
}

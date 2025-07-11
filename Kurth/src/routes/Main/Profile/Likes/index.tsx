import { useEffect, useState } from "react";
import { UserDTO } from "../../../../models/user";
import ProfileHeader from "../../../../components/ProfileHeader";
import ProfileContentDetails from "../../../../components/ProfileContentDetails";
import { Link, useParams } from "react-router-dom";
import * as UserService from "../../../../constants/user";
import MessagePosted from "../../../../components/MessagePosted";
import Reaction from "../../../../components/Reaction";
import { MessageDTO } from "../../../../models/message";
import { BASE_URL } from "../../../../utils/system";
import axios from "axios";

export default function Likes() {
  const params = useParams();

  const [user, setUser] = useState<UserDTO>();

  const [message, setMessage] = useState<MessageDTO[]>([]);


  useEffect(() => {
    axios.get(`${BASE_URL}/likecount/user/${params.username}`).then((response) => {
      console.log(response.data.content);
       const msgs = response.data.content.map(
          (msg: MessageDTO) => msg.message
        );
        setMessage(msgs);
    });
  }, []);

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
      {message.map((message) => (
        <div key={message.id} className="message-posted">
          <Link to={`/${message.user.username}/posts/${message.id}`}>
            <MessagePosted message={message} />
          </Link>
          <Reaction message={message} />
        </div>
      ))}
    </div>
  );
}

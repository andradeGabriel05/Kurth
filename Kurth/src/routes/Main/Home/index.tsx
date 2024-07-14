import { Link } from "react-router-dom";
import MessagePost from "../../../components/MessagePost";
import MessagePosted from "../../../components/MessagePosted";
import * as messageConst from "../../../constants/message";
import * as User from "../../../constants/user";
import "./style.scss";
import { useEffect, useState } from "react";
import { MessageDTO } from "../../../models/message";

export default function Home() {
  const [message, setMessage] = useState<MessageDTO[]>([]);

  useEffect(() => {
    messageConst.findAll().then((response) => {
      console.log(response.data.content);
      setMessage(response.data.content);
    });
  }, []);

  return (
    <div className="wrapper-message-user">
      <header>
        <Link to="/home" className="wrapper-message-user-home">
          Home
        </Link>
        <Link to="/following">Following</Link>
      </header>
      <MessagePost />

      {message.map((message) => (
        <div className="message-posted">
          <Link
            to={`/${User.findById(message.user.id)}/posts/${message.id}`}
          >
            <MessagePosted key={message.id} message={message} />
          </Link>
        </div>
      ))}
    </div>
  );
}

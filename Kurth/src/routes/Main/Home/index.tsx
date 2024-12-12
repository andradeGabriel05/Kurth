import { Link } from "react-router-dom";
import MessagePost from "../../../components/MessagePost";
import MessagePosted from "../../../components/MessagePosted";
import * as messageConst from "../../../constants/message";
import "./style.scss";
import { useEffect, useState } from "react";
import { MessageDTO } from "../../../models/message";
import Reaction from "../../../components/Reaction";
import { BASE_URL } from "../../../utils/system";
import axios from "../../../../node_modules/axios/index";

export default function Home() {
  const [message, setMessage] = useState<MessageDTO[]>([]);

  // const updatedLikeCount = response.data.likeCount;
  // setLikeCount(updatedLikeCount);

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
      <MessagePost message="Write anything" />

      {message.map((message) => (
        <div className="message-posted">
          <Link to={`/${message.user.username}/posts/${message.id}`}>
            <MessagePosted key={message.id} message={message} />
          </Link>
          <Reaction message={message} />
        </div>
      ))}
    </div>
  );
}

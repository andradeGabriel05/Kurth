import { Link } from "react-router-dom";
import MessagePost from "../../../components/MessagePost";
import MessagePosted from "../../../components/MessagePosted";
import * as messageConst from "../../../constants/message";
import "./style.scss";
import { useEffect, useState } from "react";
import { PostDTO } from "../../../models/message";
import Reaction from "../../../components/Reaction";
import PostMapping from "../../../components/PostMapping";

export default function Home() {
  const [message, setMessage] = useState<PostDTO[]>([]);

  useEffect(() => {
    messageConst.findAll().then((response) => {
      console.log(response.data.content);
      setMessage(response.data.content);
    });
  }, []);

  const userId = localStorage.getItem("user_id");

  return (
    <div className="wrapper-message-user">
      <header>
        <Link to="/home" className="wrapper-message-user-home">
          Home
        </Link>
        <Link to="/following">Following</Link>
      </header>
      <MessagePost message="Write anything" />

      <PostMapping post={message} />
    </div>
  );
}

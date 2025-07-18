import { Link } from "react-router-dom";
import MessagePost from "../../../components/MessagePost";
import * as messageConst from "../../../constants/message";
import "./style.scss";
import { useEffect, useState } from "react";
import { PostDTO } from "../../../models/message";
import PostMapping from "../../../components/PostMapping";

export default function Home() {
  const [message, setMessage] = useState<PostDTO[]>([]);
  const [verifyReply, setVerifyReply] = useState<boolean>();

  useEffect(() => {
    messageConst.findAll().then((response) => {
      console.log(response.data.content);
      setMessage(response.data.content);
      if(response.data.content.parent != null) {
        setVerifyReply(true)
      } else {
        setVerifyReply(false)
      }
    });
  }, []);

  // function nextPageOfMessages() {

  // }

  return (
    <div className="wrapper-message-user">
      <header>
        <Link to="/home" className="wrapper-message-user-home">
          Home
        </Link>
        <Link to="/following">Following</Link>
      </header>
      <MessagePost message="Write anything" />

      <PostMapping post={message} reply={verifyReply} messagePage={false} />

      {/* <p>______</p>
      <button onClick={nextPageOfMessages}>[DEV] Carregar proxima página</button>
      <p>______</p> */}
      </div>
  );
}

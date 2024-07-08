import { Link } from "react-router-dom";
import MessagePost from "../../../components/MessagePost";
import MessagePosted from "../../../components/MessagePosted";
import * as messageConst from "../../../constants/message";
import "./style.scss";

export default function Home() {
  return (
    <>
      <div className="wrapper-message-user">
        <header>
          <Link to="/home" className="wrapper-message-user-home">Home</Link>
          <Link to="/following">Following</Link>
        </header>
        <MessagePost />

        {messageConst.findAll().map((message) => (
          <MessagePosted key={message.id} message={message} />
        ))}
      </div>
    </>
  );
}

import "./style.scss";

import { Link } from "react-router-dom";
import { MessageDTO } from "../../models/message";
import { FaHeart, FaComment, FaShareSquare } from "react-icons/fa";

type Props = {
  message: MessageDTO;
};

export default function MessagePosted({ message }: Props) {
  return (
    <div className="form__message__posted">
      <div className="user__image">
        <Link to={`/profile/${message.username}`}>
          <img src={message.avatar} alt={message.author} />
        </Link>
      </div>
      <div className="user__details">
        <div className="routes__profile">
          <div className="post__details">
            <Link to={`/profile/${message.username}`} className="route__element">
              <span>{message.author}</span>
            </Link>
          </div>
          <div className="post__details">
            <Link to={`/profile/${message.username}`} className="route__element">
              <span>{message.username}</span>
            </Link>
          </div>
          <div className="post__details">
            <span>{message.createdAt}</span>
          </div>
        </div>
        <div className="message">
          <span>{message.content}</span>
        </div>
        <div className="reactions__message">
          <div className="reaction__comment reaction__icon">
            <FaComment />
          </div>
          <div className="reaction__like reaction__icon">
            <FaHeart />
          </div>
          <div className="reaction__share reaction__icon">
            <FaShareSquare />
          </div>
        </div>
      </div>
    </div>
  );
}

import "./style.scss";

import { Link } from "react-router-dom";
import { MessageDTO } from "../../models/message";
import { ReplyDTO } from "../../models/reply";
import Reaction from "../Reaction";

type Props = {
  message: MessageDTO | ReplyDTO;
};

export default function MessagePosted({ message }: Props) {
  const showImage = message.image && message.image !== "";

  return (
    <div className="form__message__posted p18">
      <div className="user-wrapper">
        <div className="user__image">
          <Link to={`/profile/${message.user.username}`}>
            <img
              src={message.user.avatar === null ? "https://cdn-icons-png.freepik.com/512/8742/8742495.png" : message.user.avatar}
              alt={message.user.name}
              className="icon"
            />
          </Link>
        </div>
        <div className="user__details">
          <div className="routes__profile">
            <div className="post__details">
              <Link
                to={`/profile/${message.user.username}`}
                className="route__element"
              >
                <span>{message.user.name}</span>
              </Link>
            </div>
            <div className="post__details">
              <Link
                to={`/profile/${message.user.username}`}
                className="route__element"
              >
                <span className="username">@{message.user.username}</span>
              </Link>
            </div>
            <div className="post__details">
              <span className="messagedate">{message.postedAt}</span>
            </div>
          </div>
          <div className="message">
            <span>{message.message}</span>
          </div>
          {showImage && (
            <div className="image-posted">
              <img src={message.image} alt={`${message.id}`} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

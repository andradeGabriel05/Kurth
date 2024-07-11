import "./style.scss";

import { Link } from "react-router-dom";
import { MessageDTO } from "../../models/message";
import Reaction from "../Reaction";
import { useState } from "react";

type Props = {
  message: MessageDTO;
};

export default function MessagePosted({ message }: Props) {
  const [showImage, setShowImage] = useState<boolean>(message.image !== "");

  return (
    <div className="form__message__posted p18">
      <div className="user-wrapper">
        <div className="user__image">
          <Link to={`/profile/${message.username}`}>
            <img src={message.avatar} alt={message.author} className="icon" />
          </Link>
        </div>
        <div className="user__details">
          <div className="routes__profile">
            <div className="post__details">
              <Link
                to={`/profile/${message.username}`}
                className="route__element"
              >
                <span>{message.author}</span>
              </Link>
            </div>
            <div className="post__details">
              <Link
                to={`/profile/${message.username}`}
                className="route__element"
              >
                <span className="username">{message.username}</span>
              </Link>
            </div>
            <div className="post__details">
              <span className="messagedate">{message.createdAt}</span>
            </div>
          </div>
          <div className="message">
            <span>{message.content}</span>
          </div>
          {showImage && (
            <div className="image-posted">
              <img
                src={message.image}
                alt={`${message.author}`}
              />
            </div>
          )}

          <Reaction />
        </div>
      </div>
    </div>
  );
}

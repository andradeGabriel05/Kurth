import { MessageDTO } from "../../models/message";
import "./style.scss";
import { FaHeart, FaComment, FaShareSquare } from "react-icons/fa";

type Props = {
    message: MessageDTO;
}

export default function MessagePosted({ message }: Props) {
  return (
    <div className="form__message__posted">
      <div className="user__image">
        <a href="">
          <img src={message.avatar} alt={message.author} />
        </a>
      </div>
      <div className="user__details">
        <div className="post__details">
          <span>{message.author}</span>
          <span>{message.username}</span>
          <span>{message.createdAt}</span>
        </div>

        <div className="message">
          <span>
            {message.content}
          </span>
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

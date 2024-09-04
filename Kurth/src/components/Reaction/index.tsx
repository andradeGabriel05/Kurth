import axios from "axios";
import "./style.scss";

import { FaShareSquare } from "react-icons/fa";
import { FaComment, FaHeart } from "react-icons/fa6";
import { useNavigate, useParams } from "react-router-dom";
import { MessageDTO } from "../../models/message";
import { ReplyDTO } from "../../models/reply";
import { useEffect, useState } from "react";

type Props = {
  message: MessageDTO | ReplyDTO;
};

export default function Reaction({ message }: Props) {
  const navigate = useNavigate();

  function handleLikeSubmit() {
    axios.put(`http://localhost:8080/message/${message.id}/like-count`, {
      //increaseLike
    });
    console.log("Like submitted");
  }
  function handleReplyButton() {
    //navigate to reply page
    navigate(`/${message.user.username}/posts/${message.id}`);

    console.log("Reply button clicked");
  }
  if (!message) {
    console.error("Message not found");
    return false;
  }
  return (
    
    <div className="reactions__message">
      <div
        className="reaction__comment reaction__icon"
        onClick={handleReplyButton}
      >
        <FaComment />
      </div>
      <div className="reaction__like reaction__icon" onClick={handleLikeSubmit}>
        <FaHeart className="like__count__icon" />
        <span className="like__count">{message.likeCount}</span>
      </div>
      <div className="reaction__share reaction__icon">
        <FaShareSquare />
      </div>
    </div>
  );
}

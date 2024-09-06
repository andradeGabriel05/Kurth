import axios from "axios";
import "./style.scss";

import { FaShareSquare } from "react-icons/fa";
import { FaComment, FaHeart } from "react-icons/fa6";
import { useNavigate, useParams } from "react-router-dom";
import { MessageDTO } from "../../models/message";
import { ReplyDTO } from "../../models/reply";
import { useState } from "react";
import { BASE_URL } from "../../utils/system";

type Props = {
  message: MessageDTO | ReplyDTO;
};

export default function Reaction({ message }: Props) {
  const navigate = useNavigate();

  let [likeCount, setLikeCount] = useState<number>(message.likeCount)

  async function handleLikeSubmit() {
    const response = await axios.put(`${BASE_URL}/message/${message.id}/like-count`, {
      //increaseLike
      //null
    });

    await axios.post(`${BASE_URL}/likecount`, {
      count: 1,
      user: {
        id: 1,
      },
      message: {
        id: response.data.id
      },
    })

    const updatedLikeCount = response.data.likeCount;
    setLikeCount(updatedLikeCount);
    console.log("Like count updated to:", updatedLikeCount);
    console.log("Like submitted");

    console.log(response)
    console.log(response.data.id)
    console.log(response.data.user.id)

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
        <span className="like__count">{likeCount}</span>
      </div>
      <div className="reaction__share reaction__icon">
        <FaShareSquare />
      </div>
    </div>
  );
}

import axios from "axios";
import "./style.scss";

import { FaShareSquare } from "react-icons/fa";
import { FaComment, FaHeart } from "react-icons/fa6";
import { useNavigate, useParams } from "react-router-dom";
import { MessageDTO } from "../../models/message";
import { ReplyDTO } from "../../models/reply";
import { useEffect, useState } from "react";
import { BASE_URL } from "../../utils/system";
import * as ReplyService from "../../constants/reply";

type Props = {
  message: MessageDTO | ReplyDTO;
};

export default function Reaction({ message }: Props) {
  const navigate = useNavigate();
  const user_id = localStorage.getItem("user_id");
  let [likeCount, setLikeCount] = useState<number>(message.likeCount);
  const messageId = Number(message.id);

  let [replyCount, setReplyCount] = useState<number>(0);

  useEffect(() => {
    ReplyService.countReplyMessages(messageId)
      .then((response) => {
        console.log(response.data);

        setReplyCount(response.data);
      })
      .catch((e) => {
        console.error("Error:", e.response.data);
      });
  }, [messageId]);

  // let [replyCount, setReplyCount] = useState<number>(0);

  // useEffect(() => {
  //   ReplyService.findByMessageId(0, messageId)
  //     .then((response) => {
  //       console.log(response.data);
  //       console.log(response.data.totalElements);

  //       setReplyCount(response.data.totalElements);
  //     })
  //     .catch((e) => {
  //       console.error("Error:", e.response.data);
  //     });
  //   }, [messageId]);

  async function handleLikeSubmit() {
    if (user_id) {
      try {
        await axios.post(`${BASE_URL}/likecount`, {
          user: {
            id: localStorage.getItem("user_id"),
          },
          message: {
            id: message.id,
          },
        });

        const response = await axios.put(
          `${BASE_URL}/message/${message.id}/like-count`
        );

        setLikeCount(message.likeCount + 1);

        console.log(response.data);
      } catch {
        await axios.delete(`${BASE_URL}/likecount/remove/${message.id}`, {});

        const response = await axios.put(
          `${BASE_URL}/message/${message.id}/like-count-removing`
        );

        setLikeCount(message.likeCount);

        console.log(response.data);
      }
    } else {
      navigate(`/login`);
    }
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
        <span className="like__count">{replyCount ? replyCount : 0}</span>
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

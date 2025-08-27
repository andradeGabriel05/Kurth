import "./style.scss";

import { FaShareSquare } from "react-icons/fa";
import { FaComment, FaHeart } from "react-icons/fa6";
import { useNavigate} from "react-router-dom";
import { PostDTO } from "../../models/post";
import { ReplyDTO } from "../../models/reply";
import { useEffect, useState } from "react";
import * as ReplyService from "../../constants/reply";
import * as MessageService from "../../constants/message";

type Props = {
  message: PostDTO | ReplyDTO;
};

export default function Reaction({ message }: Props) {
  const navigate = useNavigate();
  const userId: string = localStorage.getItem("user_id") || "";
  const [likeCount, setLikeCount] = useState<number>(message.likeCount || 0);
  const messageId = Number(message.id);
  const [isLiked, setIsLiked] = useState<boolean>(false);

  const [replyCount, setReplyCount] = useState<number>(0);

  const [isLiking, setIsLiking] = useState(false);
  useEffect(() => {
    ReplyService.countReplyMessages(messageId)
      .then((response) => {
        setReplyCount(response.data);
      })
      .catch((e) => {
        console.error("Error:", e.response.data);
      });
  }, [messageId]);

  useEffect(() => {
    if (messageId) {
      checkMessageLike(messageId);
    }
  }, [isLiked, messageId]);

  //levar para constants => move this to constants
  async function handleLikeSubmit(event: React.MouseEvent<HTMLDivElement>) {
    event?.preventDefault();

    if (isLiking) return; // block multiple clicks

    setIsLiking(true);
    if (userId) {
      try {
        await MessageService.likeMessageLikeCount(messageId, userId);
        await MessageService.increaseLikeMessage(messageId);

        setLikeCount((c) => c + 1);
        setIsLiked(true);
        console.log(likeCount);
      } catch {
        // If the user already liked the message, remove the like
        await MessageService.removeLike(messageId);
        await MessageService.removeLikeFromMessage(messageId);

        setLikeCount((c) => c - 1);
        setIsLiked(false);
        console.log(likeCount);
      } finally {
        setIsLiking(false);
      }

      console.log("Like button clicked");
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

  function checkMessageLike(messageId: number) {
    // Check if the user has already liked the message
    MessageService.checkIfUserLikedMessage(userId, messageId)
      .then((response) => {
        if (response.data == null) {
          setIsLiked(false);
        } else {
          setIsLiked(true);
        }
      })
      .catch((e) => {
        console.error("Error:", e.response.data);
      });
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
        <FaHeart className={`like__count__icon ${isLiked ? "liked" : ""}`} />
        <span className="like__count">{likeCount}</span>
      </div>
      <div className="reaction__share reaction__icon">
        <FaShareSquare />
      </div>
    </div>
  );
}

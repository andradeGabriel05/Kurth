import "./style.scss";

import { Link } from "react-router-dom";
import { PostDTO } from "../../models/message";
import { ReplyDTO } from "../../models/reply";
import { useEffect, useState } from "react";

type Props = {
  post: PostDTO | ReplyDTO;
  reply?: boolean;
};

//reply in that parameter, verify if this will be a reply or not
export default function MessagePosted({ post, reply = false }: Props) {
  const [showImage, setShowImage] = useState<boolean>(false)

  useEffect(() => {
    setShowImage(post?.image !== undefined && post?.image !== null && post?.image !== '');
  }, [post?.image]);

  const [date, setDate] = useState<string>("");

  useEffect(() => {
    const formattedDate = formatDate(post?.postedAt);
    setDate(formattedDate);
  }, [post?.postedAt]);

  function formatDate(dateString: string): string {
    const date = new Date(dateString);

    const actualDate = new Date();
    if (date.toDateString() === actualDate.toDateString()) {
      const diffMs = actualDate.getTime() - date.getTime();
      const diffMinutes = Math.floor(diffMs / (1000 * 60));

      if (diffMinutes < 1) {
        return "Just now";
      } else if (diffMinutes < 60) {
        return `${diffMinutes}m`;
      } else {
        const hours = Math.floor(diffMinutes / 60);
        return `${hours}h`;
      }
    }

    if (date.getFullYear() !== actualDate.getFullYear()) {
      return date.toLocaleDateString('en-US', { month: "short", day: "numeric", year: "numeric" });
    }

    return date.toLocaleDateString('en-US', { month: "short", day: "numeric" });
  }

  return (
    <div className={`${reply ? 'reply ' : ''}form__message__posted p18`}>
      <div className="user-wrapper">
        <div className="user__image">
          <Link to={`/profile/${post?.user.username}`}>
            <img
              src={
                post?.user.avatar === null
                  ? "https://cdn-icons-png.freepik.com/512/8742/8742495.png"
                  : post?.user.avatar
              }
              alt={post?.user.name}
              className="icon"
            />
          </Link>
        </div>
        <div className="user__details">
          <div className="routes__profile">
            <div className="post__details">
              <Link
                to={`/profile/${post?.user.username}`}
                className="route__element"
              >
                <span>{post?.user.name}</span>
              </Link>
            </div>
            <div className="post__details">
              <Link
                to={`/profile/${post?.user.username}`}
                className="route__element"
              >
                <span className="username">@{post?.user.username}</span>
              </Link>
            </div>
            <div className="post__details">
              <span className="messagedate">{date}</span>
            </div>
          </div>
          <div className="message">
            <span>{post?.message}</span>
          </div>
          {showImage && (
            <div className="image-posted">
              <img src={post?.image} alt={`${post?.id}`} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

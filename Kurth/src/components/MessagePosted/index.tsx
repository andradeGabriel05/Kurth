import "./style.scss";

import { Link } from "react-router-dom";
import { PostDTO } from "../../models/message";
import { useEffect, useState } from "react";
import { BASE_URL } from "../../utils/system";

import * as messageService from "../../constants/message";
import { PiDotsThree } from "react-icons/pi";
import { BiRefresh } from "react-icons/bi";

type Props = {
  post: PostDTO;
  reply?: boolean;
  onDelete?: (id: number) => void;
};

//reply in that parameter, verify if this will be a reply or not
export default function MessagePosted({
  post,
  reply = false,
  onDelete,
}: Props) {

  const [showImage, setShowImage] = useState<boolean>(false);
  const userId: string = localStorage.getItem("user_id") || "";

  useEffect(() => {
    setShowImage(
      post?.image !== undefined && post?.image !== null && post?.image !== ""
    );
  }, [post?.image]);

  const [date, setDate] = useState<string>("");

  useEffect(() => {
    const formattedDate = formatDate(post?.postedAt);
    setDate(formattedDate);
  }, [post?.postedAt]);


  const [showDeleteMessage, setShowDeleteMessage] = useState<boolean>(false);

  useEffect(() => {
    if (post.parent === undefined && post.reply) {
      setShowDeleteMessage(true);
      console.error("Post is undefined or null");
      return;
    }
  }, [post, reply]);

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
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    }

    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  }

  const [showOptions, setShowOptions] = useState(false);

  function handleOpenOptions(event: React.MouseEvent<HTMLSpanElement>) {
    event.preventDefault();
    setShowOptions(!showOptions);
  }

  function handleEdit(event: React.MouseEvent<HTMLSpanElement>) {
    event.preventDefault();

    console.log("Edit clicked for post ID:", post.id);
  }

  function handleDelete(event: React.MouseEvent<HTMLSpanElement>) {
    event.preventDefault();
    messageService
      .deleteMessage(post.id)
      .then(() => {
        console.log("Message deleted successfully");
        if (onDelete) {
          onDelete(post.id); // <— avisa pai pra remover do array
        }
      })
      .catch((error) => {
        console.error("Error deleting message:", error);
      });
  }

  const [showMaximizedImage, setShowMaximizedImage] = useState(false);

  function handleMaximizeImage(event: React.MouseEvent<HTMLDivElement>) {
    event.preventDefault();
    setShowMaximizedImage(true);
  }

  useEffect(() => {
    if (showMaximizedImage) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [showMaximizedImage]);

  return (
    <>
      <div className={`${reply ? "reply " : ""}form__message__posted p18`}>
          {/* {post?.repostOfId !== null &&
            <div className="repost__indicator">
              <Link
                to={`/profile/${post?.user.username}`}
                className="route__element"
              >
                <span><BiRefresh /> You reposted</span>
              </Link>
            </div>} */}
        <div className="user-wrapper">
          <div className="user__image">
            <Link to={`/profile/${post?.user.username}`}>
              <img
                src={post &&
                  post.user.avatar.includes("https")
                  ? post.user.avatar
                  : `http://localhost:8080/${post.user.avatar}`
                }
                alt=""
                className="icon"
              />
            </Link>
          </div>
          <div className="user__details">
            <div className="wrapper__post__details">
              <div className="routes__profile">
                <div className="wrapper__post__details">
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
              </div>
              {!reply && (
                <div className="options">
                  <span
                    className="edit__button"
                    onClick={(event) => handleOpenOptions(event)}
                  >
                    <PiDotsThree size={32} fontSizeAdjust={32} />
                  </span>
                  {showOptions && (
                    <div className="options__box">
                      {post.user.id !== userId ? (
                        <>
                          <span onClick={(event) => handleEdit(event)}>
                            Edit
                          </span>
                          <span onClick={(event) => handleDelete(event)}>
                            Delete
                          </span>
                        </>
                      ) : (
                        <span>Under Review</span>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
            <div className="message">
              <span>{post?.message}</span>
              {/* <span style={{ color: "red" }}>{showDeleteMessage && "This post has been deleted"}</span> */}
            </div>
            {showImage && (
              <div className="image-posted" onClick={handleMaximizeImage}>
                <img
                  src={post?.image ? post?.image : `${BASE_URL}/${post?.image}`}
                  alt={`${post?.id}`}
                />
              </div>
            )}

            {showMaximizedImage && (
              <div className="maximized-image" onClick={(event) => { event.preventDefault(); setShowMaximizedImage(false); }}>
                <img
                  src={post?.image ? post?.image : `${BASE_URL}/${post?.image}`}
                  alt={`${post?.id}`}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

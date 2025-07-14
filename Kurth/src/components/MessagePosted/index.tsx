import "./style.scss";

import { Link } from "react-router-dom";
import { PostDTO } from "../../models/message";
import { ReplyDTO } from "../../models/reply";

type Props = {
  post: PostDTO | ReplyDTO;
};

export default function MessagePosted({ post }: Props) {
  console.log("MessagePosted component rendered with post:", post);

  const showImage = post.image && post.image !== "";
  return (
    <div className="form__message__posted p18">
      <div className="user-wrapper">
        <div className="user__image">
          <Link to={`/profile/${post.user.username}`}>
            <img
              src={post.user.avatar === null ? "https://cdn-icons-png.freepik.com/512/8742/8742495.png" : post.user.avatar}
              alt={post.user.name}
              className="icon"
            />
          </Link>
        </div>
        <div className="user__details">
          <div className="routes__profile">
            <div className="post__details">
              <Link
                to={`/profile/${post.user.username}`}
                className="route__element"
              >
                <span>{post.user.name}</span>
              </Link>
            </div>
            <div className="post__details">
              <Link
                to={`/profile/${post.user.username}`}
                className="route__element"
              >
                <span className="username">@{post.user.username}</span>
              </Link>
            </div>
            <div className="post__details">
              <span className="messagedate">{post.postedAt}</span>
            </div>
          </div>
          <div className="message">
            <span>{post.message}</span>
          </div>
          {showImage && (
            <div className="image-posted">
              <img src={post.image} alt={`${post.id}`} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

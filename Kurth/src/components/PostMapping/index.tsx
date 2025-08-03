import { Link } from "react-router-dom";
import MessagePosted from "../MessagePosted";
import Reaction from "../Reaction";
import { PostDTO } from "../../models/message";
import { useEffect } from "react";

type Props = {
  post: PostDTO[];
  reply: boolean;
  messagePage: boolean;
  onDelete?: (id: number) => void;
  like?: boolean;
};

export default function PostMapping(
  { post, messagePage, onDelete }: Props,
  reply: boolean
) {

  useEffect(() => {
    if (post.parent === undefined && !reply) {
      console.error("Post is undefined or null");
      return;
    }
  }, [post, reply]);

  return (
    <>
      {post.map((post: PostDTO, idx: number) => (
        <div key={`post-${post.id}-${idx}`} className="message-posted">
          <Link
            to={`/${post.user.username}/posts/${post.id}`}
            className="message-link"
          >
            <MessagePosted post={post} onDelete={onDelete} />
            {post.parent === undefined && post.reply ? (
              <span className="reply-message reply-message-undefined">
                This post has been deleted
              </span>
            ) : post.parent && reply && !messagePage ? (
              <Link
                to={`/${post.user.username}/posts/${post.parent.id}`}
                className="reply-message"
                key={`parent-${post.parent.id}`}
              >
                <MessagePosted
                  post={post.parent}
                  reply={reply}
                  onDelete={onDelete}
                />
              </Link>
            ) : null}
            <Reaction message={post} />
          </Link>
        </div>
      ))}
    </>
  );
}

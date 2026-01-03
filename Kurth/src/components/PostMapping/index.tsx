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

  return (
    <>
      {post.map((post: PostDTO, idx: number) => (
        <div key={`post-${post.id}-${idx}`} className="message-posted">
          <Link
            to={`/${post.user.username}/posts/${post.id}`}
            className="message-link"
          >
            <MessagePosted post={post} onDelete={onDelete} />
            {post.reply && post.reply.id === null ? (
              <span className="reply-message reply-message-undefined">
                This post has been deleted
              </span>
            ) : 
            post.message && post.reply?.message && !messagePage && (
              <Link
                to={`/${post.user.username}/posts/${post.reply?.id}`}
                className="reply-message"
                key={`parent-${post.reply?.id}`}
              >
                <MessagePosted
                  post={post.reply}
                  reply={reply}
                  onDelete={onDelete}
                />
              </Link>
            )}
            <Reaction message={post} />
          </Link>
        </div>
      ))}
    </>
  );
}

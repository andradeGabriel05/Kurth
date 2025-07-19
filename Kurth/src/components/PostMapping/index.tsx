import { Link } from "react-router-dom";
import MessagePosted from "../MessagePosted";
import Reaction from "../Reaction";
import { PostDTO } from "../../models/message";
import { useEffect, useState } from "react";

type Props = {
  post: PostDTO[];
  reply: boolean;
  messagePage: boolean;
};

export default function PostMapping({ post, messagePage }: Props, reply: boolean) {
  console.log(messagePage)
  const [verifyReply, setVerifyReply] = useState<boolean>(false);
  useEffect(() => {
    if(messagePage) {
      setVerifyReply(true);
    }
    console.log(verifyReply)
  }, [messagePage]);
  return (
    <>
      {post.map((post: PostDTO) => (
        <div key={`post-${post.id}`} className="message-posted">
          <Link
            to={`/${post.user.username}/posts/${post.id}`}
            className="message-link"
          >
            <MessagePosted post={post} />
            {post.parent && !verifyReply ? (
              <Link
                to={`/${post.user.username}/posts/${post.parent.id}`}
                className="reply-message"
                key={`parent-${post.parent.id}`}
              >
                <MessagePosted post={post.parent} reply={reply} />
              </Link>
            ) : null}
            <Reaction message={post} />
          </Link>
        </div>
      ))}
    </>
  );
}

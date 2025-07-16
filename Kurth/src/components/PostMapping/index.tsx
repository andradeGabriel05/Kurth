import { Link } from "react-router-dom";
import MessagePosted from "../MessagePosted";
import Reaction from "../Reaction";
import { PostDTO } from "../../models/message";

type Props = {
  post: PostDTO[];
};

export default function PostMapping({ post }: Props, reply: boolean) {
  console.log(post)
  return (
    <>
      {post.map((post: PostDTO) => (
        <div key={post.id} className="message-posted">
          <Link to={`/${post.user.username}/posts/${post.id}`}>
            <MessagePosted post={post} />
            {reply ?
              <MessagePosted post={post.parent} reply={reply} /> : null}
          </Link>
          <Reaction message={post} />
        </div>
      ))}
    </>
  );
}

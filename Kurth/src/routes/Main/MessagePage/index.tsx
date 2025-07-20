import { Link, useNavigate, useParams } from "react-router-dom";
import * as MessageService from "../../../constants/message";
import MessagePosted from "../../../components/MessagePosted";
import "./style.scss";
import MessagePost from "../../../components/MessagePost";
import { useEffect, useState } from "react";
import { PostDTO } from "../../../models/message";
import { ReplyDTO } from "../../../models/reply";
import Reaction from "../../../components/Reaction";
import PostMapping from "../../../components/PostMapping";
import { useInfiniteScroll } from "../../../hooks/useInfiniteScrool";

export default function MessagePage() {
  const params = useParams();

  const navigate = useNavigate();

  const [PostDTO, setPostDTO] = useState<PostDTO>();

  const [parent, setParent] = useState<PostDTO>();

  const messageId = Number(params.messageId);
  useEffect(() => {
    if (isNaN(messageId)) {
      navigate(`/notfound`);
      return;
    }

    MessageService.findById(messageId)
      .then((response) => {
        console.log(response.data);
        setPostDTO(response.data);
        setParent(response.data.parent);
      })
      .catch((error) => {
        console.error("Error:", error.response.data);
        navigate(`/`);
      });

  }, [messageId]);

    const {
    items: posts,
    isLoading,
    verifyReply,
  } = useInfiniteScroll<PostDTO>((page: number) =>
    MessageService.findReplies(messageId, page)
  );

  return (
    <div className="wrapper-message">
      <div className="reaction-message-page">
        {PostDTO && <MessagePosted post={PostDTO} />}
        {parent && <Link to={`/${parent.user.username}/posts/${parent.id}`}><MessagePosted post={parent} reply={true} /></Link>}
      </div>
      {PostDTO && <Reaction message={PostDTO} />}

      <div className="post-message">
        <MessagePost message="What do you think about this?" />
      </div>

      <div className="replies-list-message-page">
        <div className="reply-item">
          <PostMapping post={posts} messagePage={true} />
        </div>
      </div>
    </div>
  );
}

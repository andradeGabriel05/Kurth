import { Link, useNavigate, useParams } from "react-router-dom";
import * as MessageService from "../../../constants/message";
import * as ReplyService from "../../../constants/reply";
import MessagePosted from "../../../components/MessagePosted";
import "./style.scss";
import MessagePost from "../../../components/MessagePost";
import { useEffect, useState } from "react";
import { PostDTO } from "../../../models/message";
import { ReplyDTO } from "../../../models/reply";
import Reaction from "../../../components/Reaction";

export default function MessagePage() {
  const params = useParams();

  const navigate = useNavigate();

  const [PostDTO, setPostDTO] = useState<PostDTO>();

  const [reply, setReply] = useState<ReplyDTO[]>([]);

  useEffect(() => {
    const messageId = Number(params.messageId);
    if (isNaN(messageId)) {
      navigate(`/notfound`);
      return;
    }

    MessageService.findById(messageId)
      .then((response) => {
        console.log(response.data);
        setPostDTO(response.data);
      })
      .catch((error) => {
        console.error("Error:", error.response.data);
        navigate(`/`);
      });

    MessageService.findReplies(messageId)
      .then((response) => {
        console.log(response.data.content);
        setReply(response.data.content);
      })
      .catch((e) => {
        console.error("Error:", e.response.data);
      });
  }, []);

  return (
    <div className="wrapper-message">
      <div className="reaction-message-page">
        {PostDTO && <MessagePosted post={PostDTO} />}
      </div>
      {PostDTO && <Reaction message={PostDTO} />}

      <div className="post-message">
        <MessagePost message="What do you think about this?" />
      </div>

      <div className="replies-list-message-page">
        <div className="reply-item">
          {reply && reply.map((reply: PostDTO) => (
            <div className="message-posted">
              <Link to={`/${reply.user.username}/posts/${reply.id}`}>
                <MessagePosted key={reply.id} post={reply} />
              </Link>
              <Reaction message={reply} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

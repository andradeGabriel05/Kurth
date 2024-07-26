import { useNavigate, useParams } from "react-router-dom";
import * as MessageService from "../../../constants/message";
import * as ReplyService from "../../../constants/reply";
import MessagePosted from "../../../components/MessagePosted";
import "./style.scss";
import MessagePost from "../../../components/MessagePost";
import { useEffect, useState } from "react";
import { MessageDTO } from "../../../models/message";
import { ReplyDTO } from "../../../models/reply";

export default function MessagePage() {
  const params = useParams();

  const navigate = useNavigate();

  const [message, setMessage] = useState<MessageDTO>();

  const [reply, setReply] = useState<ReplyDTO>();

  useEffect(() => {
    const messageId = Number(params.messageId);
    if (isNaN(messageId)) {
      navigate(`/notfound`);
      return;
    }

    MessageService.findById(messageId)
      .then((response) => {
        console.log(response.data);
        setMessage(response.data);
      })
      .catch((error) => {
        console.error("Error:", error.response.data);
        navigate(`/`);
      });

    ReplyService.findByMessageId(0, messageId)
      .then((response) => {
        console.log(response.data);
        setReply(response.data);
      })
      .catch((e) => {
        console.error("Error:", e.response.data);
      });
  }, []);

  return (
    <div className="wrapper-message">
      <div className="reaction-message-page">
        {message && <MessagePosted message={message} />}
      </div>

      <div className="post-message">
        <MessagePost message="Post your reply" />
      </div>

      <div className="replies-list-message-page">
        <div className="reply-item">
          {reply &&
            reply.content.map((reply: ReplyDTO) => (
              <div key={reply.id} className="reply-text">
                <MessagePosted message={reply} />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

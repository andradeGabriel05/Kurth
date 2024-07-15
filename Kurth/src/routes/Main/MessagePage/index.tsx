import { useNavigate, useParams } from "react-router-dom";
import * as MessageService from "../../../constants/message";
import MessagePosted from "../../../components/MessagePosted";
import "./style.scss";
import MessagePost from "../../../components/MessagePost";
import { useEffect, useState } from "react";
import { MessageDTO } from "../../../models/message";

export default function MessagePage() {
  const params = useParams();

  const navigate = useNavigate();

  const [message, setMessage] = useState<MessageDTO>();
  useEffect(() => {
    MessageService
      .findById(Number(params.messageId))
      .then((response) => {
        console.log(response.data);
        setMessage(response.data);
      })
      .catch((error) => {
        console.error("Error:", error.response.data);
        navigate(`/`);
      });
  }, []);

  return (

<div className="wrapper-message">
      <div className="reaction-message-page">
        {message && <MessagePosted message={message} />}
      </div>

      <div className="post-message">
        <MessagePost />
      </div>

      {/* For the future */}

      <div className="comments-list-message-page">
        {/* Example comment */}
        <div className="comment-item">
          <div className="comment-avatar">
            <img
              src="https://thispersondoesnotexist.com/"
              alt=""
              className="icon"
            />
          </div>
          <div className="comment-text">
            <p>Example comment</p>
          </div>
          <div className="comment-action">
            <button>Like</button>
            <button>Reply</button>
          </div>
        </div>
      </div>
    </div>
  );
}

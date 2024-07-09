import { useParams } from "react-router-dom";
import * as MessageConst from "../../constants/message";
import MessagePosted from "../../components/MessagePosted";
import "./style.scss";
import MessagePost from "../../components/MessagePost";

export default function MessagePage() {
  const params = useParams();

  const messageId = parseInt(params.messageId as string);

  const messageParam = MessageConst.findById(messageId);

  return (
    <div className="wrapper-message">
      <div className="reaction-message-page">
        <MessagePosted message={messageParam} />
      </div>

      <div className="post-message">
        <MessagePost />
      </div>

      {/* For the future */}

      <div className="comments-list-message-page">
        {/* Render comments */}
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

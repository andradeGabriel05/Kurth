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

export default function MessagePage() {
  const params = useParams();

  const navigate = useNavigate();

  const [PostDTO, setPostDTO] = useState<PostDTO>();

  const [reply, setReply] = useState<ReplyDTO[]>([]);

  const [parent, setParent] = useState<PostDTO>();

  const [actualPage, setActualPage] = useState<number>(0);

  const [isLoading, setIsLoading] = useState<boolean>(false);

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
        setParent(response.data.parent);
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
  }, [params.messageId]);

    useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isLoading]);

  useEffect(() => {
    if (actualPage > 0) {
      MessageService.findReplies(Number(params.messageId), actualPage)
        .then((response) => {
          console.log(response.data);
          setReply((prev) => [...prev, ...response.data.content]);
        })
        .catch((error) => {
          console.error("Error:", error.response.data);
        });
    }
  }, [actualPage]);

  function handleScroll() {
    const scrollTop = window.scrollY;
    const windowHeight = window.innerHeight;
    const fullHeight = document.documentElement.scrollHeight;
    const isNearBottom = scrollTop + windowHeight >= fullHeight - 100;

    if (isNearBottom && !isLoading) {
      setIsLoading(true);
      setActualPage((prev) => prev + 1);
    }
  }

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
          <PostMapping post={reply} messagePage={true} />
        </div>
      </div>
    </div>
  );
}

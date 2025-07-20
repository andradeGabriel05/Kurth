import { Link } from "react-router-dom";
import MessagePost from "../../../components/MessagePost";
import * as messageConst from "../../../constants/message";
import "./style.scss";
import { useEffect, useState } from "react";
import { PostDTO } from "../../../models/message";
import PostMapping from "../../../components/PostMapping";

export default function Home() {
  const [message, setMessage] = useState<PostDTO[]>([]);
  const [verifyReply, setVerifyReply] = useState<boolean>(false);
  const [actualPage, setActualPage] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  //initially load the first page of messages
  useEffect(() => {
    pageOfMessages(0);
  }, []);

  //load more messages when scrolling to the bottom
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isLoading]);

  //load next page of messages when actualPage changes
  useEffect(() => {
    if (actualPage > 0) {
      pageOfMessages(actualPage);
    }
  }, [actualPage]);

  //i'm using this function in a lot of places...
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

  function pageOfMessages(page = actualPage) {
    messageConst
      .findAll(page)
      .then((response) => {
        console.log(response.data.content);
        setMessage((prev) => [...prev, ...response.data.content]);
        if (response.data.content.parent != null) {
          setVerifyReply(true);
        } else {
          setVerifyReply(false);
        }
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  }

  return (
    <div className="wrapper-message-user">
      <header>
        <Link to="/home" className="wrapper-message-user-home">
          Home
        </Link>
        <Link to="/following">Following</Link>
      </header>
      <MessagePost message="Write anything" />

      <PostMapping post={message} reply={verifyReply} messagePage={false} />

      {/* <p>______</p>
      <button onClick={nextPageOfMessages}>[DEV] Carregar proxima página</button>
      <p>______</p> */}
    </div>
  );
}

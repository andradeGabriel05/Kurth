import { Link } from "react-router-dom";
import MessagePost from "../../../components/MessagePost";
import * as messageConst from "../../../constants/message";
import "./style.scss";
import { useEffect, useState } from "react";
import { PostDTO } from "../../../models/message";
import PostMapping from "../../../components/PostMapping";
import { useInfiniteScroll } from "../../../hooks/useInfiniteScrool";

export default function Home() {
  const { items: posts, isLoading, verifyReply} = useInfiniteScroll<PostDTO>(
    (page: number) => messageConst.findAll(page)
  );

  return (
    <div className="wrapper-message-user">
      <header>
        <Link to="/home" className="wrapper-message-user-home">
          Home
        </Link>
        <Link to="/following">Following</Link>
      </header>
      <MessagePost message="Write anything" />

      <PostMapping post={posts} reply={verifyReply} messagePage={false} />
      {isLoading && <div>Carregando mais posts...</div>}

      {/* <p>______</p>
      <button onClick={nextPageOfMessages}>[DEV] Carregar proxima página</button>
      <p>______</p> */}
    </div>
  );
}

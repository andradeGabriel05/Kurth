import { Link } from "react-router-dom";
import MessagePost from "../../../components/MessagePost";
import * as messageConst from "../../../constants/message";
import "./style.scss";
import PostMapping from "../../../components/PostMapping";
import { useInfiniteScroll } from "../../../hooks/useInfiniteScrool";
import { useEffect, useState } from "react";
import { PostDTO } from "../../../models/message";

export default function Home() {
  const {
    items: posts,
    isLoading,
    verifyReply,
    removeItemById,
  } = useInfiniteScroll((page: number) => messageConst.findAll(page));

  function handlePostDeleted(id: number) {
    removeItemById(id);
  }

  const [postList, setPostList] = useState<PostDTO[]>(posts);
  useEffect(() => {
    setPostList(posts);
    console.log("Home - posts updated:", posts);
  }, [posts]);

  return (
    <div className="wrapper-message-user">
      <header>
        <Link to="/home" className="wrapper-message-user-home">
          Home
        </Link>
        <Link to="/following">Following</Link>
      </header>
      <MessagePost setPosts={setPostList} posts={postList} message="Write anything" />

      <PostMapping
        post={postList}
        reply={verifyReply}
        messagePage={false}
        onDelete={handlePostDeleted}
      />
      {isLoading && <div>Carregando mais posts...</div>}
    </div>
  );
}

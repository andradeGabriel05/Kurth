import { Link } from "react-router-dom";
import MessagePost from "../../../components/MessagePost";
import * as messageConst from "../../../constants/message";
import "./style.scss";
import PostMapping from "../../../components/PostMapping";
import { useInfiniteScroll } from "../../../hooks/useInfiniteScrool";

export default function Home() {
  const { items: posts, isLoading, verifyReply, removeItemById } = useInfiniteScroll(
    (page: number) => messageConst.findAll(page)
  );

  function handlePostDeleted(id: number) {
    removeItemById(id);
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

      <PostMapping post={posts} reply={verifyReply} messagePage={false} onDelete={handlePostDeleted} />
      {isLoading && <div>Carregando mais posts...</div>}

      
    </div>
  );
}

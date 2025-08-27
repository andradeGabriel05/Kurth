import { Link, useNavigate } from "react-router-dom";
import { UserDTO } from "../../../models/user";
import { useEffect, useState } from "react";

import * as messageService from "../../../constants/message";
import { PostDTO } from "../../../models/post";
import MessagePost from "../../../components/MessagePost";
import PostMapping from "../../../components/PostMapping";
import { useInfiniteScroll } from "../../../hooks/useInfiniteScrool";

type Props = {
  user: UserDTO;
};

export default function Following({ user }: Props) {
  const navigate = useNavigate();

  // Using the custom hook for infinite scroll
  // must change in others components
  // like Main/Home, Main/Profile, Main/MessagePage

  // it acttually works
  const {
    items: posts,
    isLoading,
    verifyReply,
  } = useInfiniteScroll<PostDTO>((page: number) =>
    messageService.findAllUserFollowingMessages(user.id, page)
  );

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  return (
    <div className="wrapper-message-user">
      <header>
        <Link to="/home" className="wrapper-message-user-home">
          Home
        </Link>
        <Link to="/following">Following</Link>
      </header>
      <MessagePost message="Write anything" />
      <PostMapping post={posts} messagePage={false} />
      {isLoading && <div>Carregando mais posts...</div>}
    </div>
  );
}

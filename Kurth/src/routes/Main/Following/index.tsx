import { Link, useNavigate } from "react-router-dom";
import { UserDTO } from "../../../models/user";
import { useEffect, useState } from "react";

import * as messageService from "../../../constants/message";
import { PostDTO } from "../../../models/message";
import MessagePosted from "../../../components/MessagePosted";
import Reaction from "../../../components/Reaction";
import MessagePost from "../../../components/MessagePost";
import PostMapping from "../../../components/PostMapping";

type Props = {
  user: UserDTO;
};

export default function Following({ user }: Props) {
  const navigate = useNavigate();

  const [message, setMessage] = useState<PostDTO[]>([]);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }

    messageService.findAllUserFollowingMessages(user.id).then((response) => {
      console.log(response.data.content);
      type PostResponse = { post: PostDTO };

      const msgs = response.data.content.map(
        (msg: PostResponse) => (console.log(msg), msg)
      );

      setMessage(msgs);
    });
  });

  return (
    <div className="wrapper-message-user">
      <header>
        <Link to="/home" className="wrapper-message-user-home">
          Home
        </Link>
        <Link to="/following">Following</Link>
      </header>
      <MessagePost message="Write anything" />
      <PostMapping post={message} />
    </div>
  );
}

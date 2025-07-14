import { useEffect, useState } from "react";
import { UserDTO } from "../../../../models/user";
import ProfileHeader from "../../../../components/ProfileHeader";
import ProfileContentDetails from "../../../../components/ProfileContentDetails";
import { Link, useParams } from "react-router-dom";
import * as UserService from "../../../../constants/user";
import MessagePosted from "../../../../components/MessagePosted";
import Reaction from "../../../../components/Reaction";
import { PostDTO } from "../../../../models/message";
import { BASE_URL } from "../../../../utils/system";
import axios from "axios";
import PostMapping from "../../../../components/PostMapping";

type Props = {
  user: UserDTO;
};

export default function Likes({ user }: Props) {
  const params = useParams();

  // const [user, setUser] = useState<UserDTO>();

  const [post, setPost] = useState<PostDTO[]>([]);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/likecount/user/${params.username}`)
      .then((response) => {
        console.log(response.data.content);
        type LikeResponse = { post: PostDTO };
        const msgs = response.data.content.map((msg: LikeResponse) => msg.post);
        setPost(msgs);
      });
  }, [params.username]);

  return (
    <div className="profile-container">
      {user && <ProfileHeader user={user} />}
      <div className="profile-content">
        {user && <ProfileContentDetails user={user} />}
      </div>
      <PostMapping post={post} />
    </div>
  );
}

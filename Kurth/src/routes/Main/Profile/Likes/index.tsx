import { useEffect, useState } from "react";
import { UserDTO } from "../../../../models/user";
import ProfileHeader from "../../../../components/ProfileHeader";
import ProfileContentDetails from "../../../../components/ProfileContentDetails";
import { Link, useParams } from "react-router-dom";
import { PostDTO } from "../../../../models/message";
import { BASE_URL } from "../../../../utils/system";
import axios from "axios";
import PostMapping from "../../../../components/PostMapping";
import * as User from "../../../../constants/user";

type Props = {
  user: UserDTO;
};

export default function Likes({ user }: Props) {
  const params = useParams();

  const [userPage, setUserPage] = useState<UserDTO>();

  const [post, setPost] = useState<PostDTO[]>([]);

  const username = params.username;

  useEffect(() => {
    axios
      .get(`${BASE_URL}/likecount/user/${username}?sort=likedAt,desc`)
      .then((response) => {
        console.log(response.data);
        type LikeResponse = { post: PostDTO };
        const msgs = response.data.content.map((msg: LikeResponse) => msg.post);
        setPost(msgs);
      });
  }, [username]);


  useEffect(() => {
    User.findByUsername(username as string).then((response) => {
      setUserPage(response.data);
    });
    console.log(userPage);
  }, []);

  return (
    <div className="profile-container">
      {userPage && <ProfileHeader user={userPage} />}
      <div className="profile-content">
        {userPage && <ProfileContentDetails user={userPage} />}
      </div>
      <PostMapping post={post} messagePage={false} />
    </div>
  );
}

import { useEffect, useState } from "react";
import { UserDTO } from "../../../../models/user";
import ProfileHeader from "../../../../components/ProfileHeader";
import ProfileContentDetails from "../../../../components/ProfileContentDetails";
import { useParams } from "react-router-dom";
import PostMapping from "../../../../components/PostMapping";
import * as User from "../../../../constants/user";
import * as messageConst from "../../../../constants/message";
import { useInfiniteScroll } from "../../../../hooks/useInfiniteScrool";
import { PostDTO } from "../../../../models/message";

type Props = {
  user: UserDTO;
};

export default function Likes({ user }: Props) {
  const params = useParams();
  const username: string = params.username as string;

  const {
    items: posts,
    isLoading,
    verifyReply,
    removeItemById,
  } = useInfiniteScroll((page: number) =>
    messageConst.findLikedMessages(username, page)
  );

  const eachPost: PostDTO[] = posts.map(post => post.post);

  // const [post, setPost] = useState<PostDTO[]>([]);

  // useEffect(() => {
  //   axios
  //     .get(`${BASE_URL}/likecount/user/${username}?sort=likedAt,desc`)
  //     .then((response) => {
  //       console.log(response.data);
  //       type LikeResponse = { post: PostDTO };
  //       const msgs = response.data.content.map((msg: LikeResponse) => msg.post);
  //       setPost(msgs);
  //     });
  // }, [username]);

  function handlePostDeleted(id: number) {
    removeItemById(id);
  }

  const [userPage, setUserPage] = useState<UserDTO>();
  useEffect(() => {
    User.findByUsername(username as string).then((response) => {
      setUserPage(response.data);
    });
  }, [username, user]);

  return (
    <div className="profile-container">
      {userPage && <ProfileHeader user={userPage} />}
      <div className="profile-content">
        {userPage && <ProfileContentDetails user={userPage} />}
      </div>
      <PostMapping
        post={eachPost}
        messagePage={false}
        reply={verifyReply}
        onDelete={handlePostDeleted}
        like={true}
      />
    </div>
  );
}

import "./style.scss";
import ProfileContentDetails from "../../../components/ProfileContentDetails";
import ProfileHeader from "../../../components/ProfileHeader";
import { useParams } from "react-router-dom";
import * as UserService from "../../../constants/user";
import * as MessageService from "../../../constants/message";
import { UserDTO } from "../../../models/user";
import { useEffect, useState } from "react";
import { PostDTO } from "../../../models/message";
import { useInfiniteScroll } from "../../../hooks/useInfiniteScrool";
import PostMapping from "../../../components/PostMapping";
// import { user } from "../../constants/";

export default function Profile() {
  const params = useParams();

  const {
    items: posts,
    isLoading,
    verifyReply,
  } = useInfiniteScroll<PostDTO>((page: number) =>
    MessageService.findUserMessages(params.username || "", page), params.username as string
  );

  const [user, setUser] = useState<UserDTO>();

  //initially load the first page of messages
  useEffect(() => {
    UserService.findByUsername(params.username as string)
      .then(async (response) => {
        console.log(response.data);
        setUser(response.data);
      })
      .catch((error) => {
        console.error("Error:", error.response.data);
      });
  }, [params.username]);

  return (
    <div className="profile-container">
      <div className="profile-content">
        {user && <ProfileContentDetails user={user} />}
      </div>
      {posts && posts.length === 0 && (
        <div className="no-message">No messages found for this user.</div>
      )}

      <PostMapping post={posts} reply={verifyReply} messagePage={false} />

      {isLoading && <div>Carregando mais posts...</div>}
    </div>
  );
}

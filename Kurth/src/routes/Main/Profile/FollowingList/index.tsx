import "./style.scss";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { UserDTO } from "../../../../models/user";
import * as UserService from "../../../../constants/user";
import ProfileContentActions from "../../../../components/ProfileContentActions";
import { BiArrowBack } from "react-icons/bi";
import { useInfiniteScroll } from "../../../../hooks/useInfiniteScrool";

export default function FollowingList() {
  const params = useParams();
  const [user, setUser] = useState<UserDTO>();

  const userLoggedIn = localStorage.getItem("user_id");

  const { items: users, isLoading } = useInfiniteScroll((page: number) =>
    UserService.following(params.username as string, page)
  );

  const navigate = useNavigate();

  //initially load the first page of messages
  useEffect(() => {
    UserService.findByUsername(params.username as string)
      .then(async (response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.error("Error:", error.response.data);
      });
  }, [params.username]);

  console.log(users)

  // const [following, setFollowing] = useState<UserDTO[]>([]);

  // useEffect(() => {
  //   if (user) {
  //     UserService.following(user.username)
  //       .then((response) => {
  //         console.log(response.data.content[0].userFollowing);
  //         setFollowing(response.data.content.map((item) => item.userFollowing));
  //       })
  //       .catch((error) => {
  //         console.error("Error:", error.response.data);
  //       });
  //   }
  // }, [params.username, user]);

  return (
    <div className="profile-container">
      <div className="title">
        <BiArrowBack
          className="back-button"
          onClick={() => navigate(`/profile/${user?.username}`)}
        />
        <h2>{user?.name}'s Following</h2>
        <h4>@{user?.username}</h4>
      </div>
      {users &&
        users.map((following) => (
          <Link to={`/profile/${following.userFollowing.username}`} key={following.userFollowing.id}>
            <div className="following-item">
              <div className="left">
                <img src={following.userFollowing.avatar} alt={following.userFollowing.name} />
                <div className="wrapper-name">
                  <span>{following.userFollowing.name}</span>
                  <span className="username">@{following.userFollowing.username}</span>
                </div>
              </div>

              {userLoggedIn && userLoggedIn !== String(following.userFollowing.id) && (
                <div
                  className="button-follow"
                  onClick={(event) => {
                    event.stopPropagation();
                  }}
                >
                  <ProfileContentActions
                    userLoggedInId={userLoggedIn}
                    userId={following.userFollowing.id as string}
                  />
                </div>
              )}
            </div>
          </Link>
        ))}
      {users && users.length === 0 && <span>No following users</span>}
      {isLoading && <span>Loading...</span>}
    </div>
  );
}

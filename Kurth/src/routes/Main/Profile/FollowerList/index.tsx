import "./style.scss";
import { useEffect, useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { UserDTO } from "../../../../models/user";
import * as UserService from "../../../../constants/user";
import ProfileContentActions from "../../../../components/ProfileContentActions";
import { BiArrowBack } from "react-icons/bi";
import { useInfiniteScroll } from "../../../../hooks/useInfiniteScrool";

export default function FollowerList() {
  const params = useParams();
  const [user, setUser] = useState<UserDTO>();

  const userLoggedIn = localStorage.getItem("user_id");

  const navigate = useNavigate();

  const { items: users, isLoading } = useInfiniteScroll((page: number) =>
    UserService.followers(params.username as string, page)
  );


  console.log(users);
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

  // const [followers, setFollowers] = useState<UserDTO[]>([]);

  // useEffect(() => {
  //   if (user) {
  //     UserService.followers(user.username)
  //       .then((response) => {
  //         console.log(response.data.content);
  //         setFollowers(response.data.content.map((item) => item.userFollower));
  //         console.log(followers);
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
        <h2>{user?.name}'s Followers</h2>
        <h4>@{user?.username}</h4>
      </div>
      {users &&
        users.map((follower) => (
          <Link to={`/profile/${follower.userFollower.username}`} key={follower.id}>
            <div className="following-item">
              <div className="left">
                <img src={follower.userFollower.avatar} alt={follower.userFollower.name} />
                <div className="wrapper-name">
                  <span>{follower.userFollower.name}</span>
                  <span className="username">@{follower.userFollower.username}</span>
                </div>
              </div>

              {userLoggedIn && userLoggedIn !== String(follower.userFollower.id) && (
                <div
                  className="button-follow"
                  onClick={(event) => {
                    event.stopPropagation();
                  }}
                >
                  <ProfileContentActions
                    userLoggedInId={userLoggedIn as string}
                    userId={follower.userFollower.id as string}
                  />
                </div>
              )}
            </div>
          </Link>
        ))}
      {users && users.length === 0 && <span>No follower users</span>}
      {isLoading && <span>Loading...</span>}
    </div>
  );
}

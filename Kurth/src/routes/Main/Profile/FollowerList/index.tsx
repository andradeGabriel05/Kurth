import "./style.scss";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { UserDTO } from "../../../../models/user";
import * as UserService from "../../../../constants/user";
import ProfileContentActions from "../../../../components/ProfileContentActions";

export default function FollowerList() {
  const params = useParams();
  const [user, setUser] = useState<UserDTO>();

  const userLoggedIn = localStorage.getItem("user_id");

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

  const [followers, setFollowers] = useState<UserDTO[]>([]);

  useEffect(() => {
    if (user) {
      UserService.followers(user.username)
        .then((response) => {
          console.log(response.data.content);
          setFollowers(response.data.content.map((item) => item.userFollower));
          console.log(followers);
        })
        .catch((error) => {
          console.error("Error:", error.response.data);
        });
    }
  }, [params.username, user]);

  return (
    <div className="profile-container">
      <div className="title">
        <h2>{user?.name}'s Followers</h2>
        <h4>@{user?.username}</h4>
      </div>
      {followers &&
        followers.map((follower) => (
          <Link to={`/profile/${follower.username}`} key={follower.id}>
            <div className="following-item">
              <div className="left">
                <img src={follower.avatar} alt={follower.name} />
                <div className="wrapper-name">
                  <span>{follower.name}</span>
                  <span className="username">@{follower.username}</span>
                </div>
              </div>

              {userLoggedIn && userLoggedIn !== String(follower.id) && (
                <div
                  className="button-follow"
                  onClick={(event) => {
                    event.stopPropagation();
                  }}
                >
                  <ProfileContentActions
                    userLoggedInId={userLoggedIn as string}
                    userId={follower.id as string}
                  />
                </div>
              )}
            </div>
          </Link>
        ))}
      {followers && followers.length === 0 && <span>No follower users</span>}
    </div>
  );
}

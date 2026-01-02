import { useEffect, useState } from "react";
import { UserDTO } from "../../models/user";
import "./style.scss";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FaEnvelope } from "react-icons/fa6";
import * as UserService from "../../constants/user";
import * as Message from "../../constants/message";
import NavigationLink from "../NavigationLink";
import * as Follow from "../../constants/follow";

type Props = {
  user: UserDTO;
};

// this freaked me out because
export default function ProfileContentDetails({ user }: Props) {
  const userLoggedIn = localStorage.getItem("user_id") || "";

  const navigate = useNavigate();
  const params = useParams();
  const [userId, setUserId] = useState<string>(user.id);

  const [followers, setFollowers] = useState<number>(user.followers);
  useEffect(() => {
    UserService.findByUsername(params.username as string)
      .then((response) => {
        const fetchedId = response.data.id;
        setUserId(fetchedId);
        setFollowers(response.data.followers);
      })
      .catch((error) => {
        console.error("Error:", error.response.data);
      });
  }, [params.username, followers]);

  // check if user is following
  const [isFollowing, setIsFollowing] = useState(false);
  useEffect(() => {
    console.log(userLoggedIn);
    console.log(params.username);
    if (userId !== undefined && userLoggedIn !== userId) {
      Follow.checkFollowStatus(userLoggedIn, userId)
        .then((response) => {
          setIsFollowing(response.status == 204 ? false : true);
        })
        .catch((error) => {
          console.error("Error:", error.response.data);
        });
    }
  }, [userLoggedIn, userId, params.username]);

  // this is for follow and unfollow users
  // if you double click, this will not work
  // jesus...

  async function handleFollow(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!userLoggedIn) {
      return navigate("/login");
    }
    try {
      if (!isFollowing) {
        // seguindo usuário -> following user

        console.log("62 ->", userLoggedIn, userId);
        await Follow.followUser(userLoggedIn, userId);

        await Follow.increaseUserFollower(userId);
        await Follow.increaseUserFollowing();

        // atualizar o número de seguidores -> updtate numbers of followers
        setFollowers((prevFollowers) => prevFollowers + 1);
        setIsFollowing(true); // atualiza o texto do botao para 'parar de seguir' -> update button text to 'unfollow'
        console.log("Followed");
      } else {
        const response = await Follow.checkFollowStatus(userLoggedIn, userId);

        // Deixar de seguir usuário -> unfollow user
        await Follow.decreaseUserFollower(userId);
        await Follow.decreaseUserFollowing();

        if (response.data.id) {
          await Follow.removeFollow(response.data.id);
          setFollowers((prevFollowers) => prevFollowers - 1);
          setIsFollowing(false); // atualizar o texto do botao para 'seguir' -> update button text to 'follow'

          console.log("Unfollowed");
        }
      }
    } catch (error) {
      window.alert("Error in follow/unfollow request");
      console.error("Error in follow/unfollow request:", error);
      window.location.reload();
    }
  }

  const [editProfile, setEditProfile] = useState(false);
  const [userData, setUserData] = useState({
    username: user.username,
    bio: user.bio,
    avatar: user.avatar,
  });

  useEffect(() => {
    setUserData({
      username: user.username,
      bio: user.bio,
      avatar: user.avatar,
    });
  }, [user, params.username]);

  const [handleImage, setHandleImage] = useState<File | null>(null);

  async function saveImageLocal(file: File) {
    const formData = new FormData();
    formData.append("image", file);

    const response = await Message.saveImageLocal(formData);
    console.log("Image uploaded:", response);
    return response.data;
  }

  function handleEditProfile() {
    setEditProfile(true);
  }

  async function handleSubmitUpdate(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (handleImage) {
      userData.avatar = await saveImageLocal(handleImage);
      console.log("Image URL:", userData.avatar);
    }

    console.log("Form submitted with data:", userData);
    await UserService.updateUser(
      userData.username,
      userData.bio,
      userData.avatar
    );

    if (userData.username !== user.username) {
      localStorage.setItem("username", userData.username);
      user.username = userData.username;
      navigate(`/profile/${userData.username}`);
    }
    setEditProfile(false);

    user.bio = userData.bio;
    user.avatar = userData.avatar;
    console.log("Profile updated successfully");
  }

  useEffect(() => {
    if (!editProfile) {
      setUserData({
        username: user.username,
        bio: user.bio,
        avatar: user.avatar,
      });

      setHandleImage(null);
    }
  }, [editProfile]);

  return (
    <>
      {editProfile && (
        <div className="edit-profile-modal">
          <div className="edit-profile-content">
            <div className="header">
              <h2>Edit Profile</h2>
              <button className="close" onClick={() => setEditProfile(false)}>
                X
              </button>
            </div>
            <div className="line-division"></div>
            {/* Add form or content for editing profile here */}
            <div className="form-edit-profile">
              <form onSubmit={handleSubmitUpdate}>
                <div className="change-first-row">
                  <div className="change-avatar">
                    <label htmlFor="avatar">
                      {userData.avatar.includes("https") ? (
                        <img
                          src={
                            handleImage
                              ? URL.createObjectURL(handleImage)
                              : userData.avatar
                          }
                          alt=""
                          className="icon"
                        />
                      ) : (
                        <img
                          src={
                            handleImage
                              ? URL.createObjectURL(handleImage)
                              : `http://localhost:8080/${userData.avatar}`
                          }
                          alt=""
                          className="icon"
                        />
                      )}
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      id="avatar"
                      name="avatar"
                      onChange={(e) =>
                        setHandleImage(
                          e.target.files && e.target.files[0]
                            ? e.target.files[0]
                            : null
                        )
                      }
                      style={{ display: "none" }}
                    />
                  </div>
                  <div className="change-username">
                    <label htmlFor="username">Username</label>
                    <input
                      type="text"
                      id="username"
                      placeholder="username"
                      value={userData.username}
                      onChange={(e) =>
                        setUserData({ ...userData, username: e.target.value })
                      }
                    />
                  </div>
                </div>
                <label htmlFor="bio">Bio</label>
                <textarea
                  name="bio"
                  id="bio"
                  placeholder="Bio"
                  value={userData.bio}
                  onChange={(e) =>
                    setUserData({ ...userData, bio: e.target.value })
                  }
                ></textarea>
                <button type="submit">Save</button>
              </form>
            </div>
          </div>
        </div>
      )}
      <div className="profile-header">
        <div className="profile-image">
          {!userData.avatar.includes("https") ? (
            <img
              src={
                userData.avatar && !editProfile
                  ? `http://localhost:8080/${userData.avatar}`
                  : `http://localhost:8080/${user.avatar}`
              }
              alt={user.username}
            />
          ) : (
            <img src={`${user.avatar}`} alt={user.username} />
          )}
        </div>
        <div className="profile-details">
          <span className="profile-details-name">{user.name}</span>
          <span className="profile-details-username">
            @
            {userData.username && !editProfile
              ? userData.username
              : user.username}
          </span>
          <span>{userData.bio && !editProfile ? userData.bio : user.bio}</span>
        </div>
      </div>
      <div className="profile-content-details">
        <span>
          <Link to={`/profile/${params.username}/followers`}>
            {followers}
            <span className="profile-content-details-text"> Followers</span>
          </Link>
        </span>
        <span>
          <Link to={`/profile/${params.username}/following`}>
            {user.following}
            <span className="profile-content-details-text"> Following</span>
          </Link>
        </span>

        <div className="profile-content-actions">
          {/* if in your profile */}
          {userId && userId == userLoggedIn ? (
            <button onClick={handleEditProfile}>Edit profile</button>
          ) : (
            // follow and unfollow text
            <form method="post" onSubmit={handleFollow}>
              <button type="submit">
                {isFollowing ? "Unfollow" : "Follow"}
              </button>
            </form>
          )}
          <button>
            <FaEnvelope className="reactIcon" />
          </button>
        </div>
      </div>

      <div className="other-pages-user-page">
        <NavigationLink link={`profile/${params.username}`} profile={true}>
          {["Posts"]}
        </NavigationLink>
        <NavigationLink
          link={`profile/${params.username}/likes`}
          profile={true}
        >
          {["Likes"]}
        </NavigationLink>
      </div>
    </>
  );
}

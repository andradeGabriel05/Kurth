//aside

import { FaEllipsis } from "react-icons/fa6";
import "./style.scss";
import {
  FaHome,
  FaSearch,
  FaCompass,
  FaEnvelope,
  FaBell,
  FaUser,
} from "react-icons/fa";
import { Link, Navigate, useNavigate } from "react-router-dom";
import NavigationLink from "../NavigationLink";
import * as User from "../../constants/user";
import { useEffect, useState } from "react";
import { UserDTO } from "../../models/user";
import * as user from "../../constants/user";

export default function Aside() {
  const user_id: string = localStorage.getItem("user_id") || "";
  const username: string = localStorage.getItem("username") || "";
  const [userDTO, setUserDTO] = useState<UserDTO>();

  const navigate = useNavigate();

  useEffect(() => {
    User.findById(user_id)
      .then((response) => {
        setUserDTO(response.data);
      })
      .catch((error) => {
        console.error("Error:", error.response.data);
      });
  }, [user_id]);

  const [showLogout, setShowLogout] = useState(false);

  function handleProfileOptions() {
    setShowLogout(!showLogout);
  }

  function handleLogout() {
    console.log("Logging out user...");
    user.logout().then(e => {
      console.log("Logout successful:", e);
      navigate(`/login`);
    }).catch((error) => (
      console.error("Error during logout:", error)
    ));
  }
  return (
    <aside>
      <div className="aside__title">
        <Link to="/">
          <h1 className="aside__title__h1">Kurth</h1>
        </Link>
      </div>

      <div className="aside__nav">
        <ul>
          <li>
            <NavigationLink link="home">
              <FaHome className="reactIcon" />
              Home
            </NavigationLink>
          </li>
          <li>
            <NavigationLink link="search">
              <FaSearch className="reactIcon" />
              Search
            </NavigationLink>
          </li>
          <li>
            <NavigationLink link="explore">
              <FaCompass className="reactIcon" />
              Explore
            </NavigationLink>
          </li>
          <li>
            <NavigationLink link="notfound">
              <FaEnvelope className="reactIcon" />
              Messages
            </NavigationLink>
          </li>
          <li>
            <NavigationLink link="notfound">
              <FaBell className="reactIcon" /> Notifications
            </NavigationLink>
          </li>
          <li>
            {user_id && user_id !== null ? (
              <NavigationLink link={`profile/${username}`}>
                <FaUser className="reactIcon" /> Profile
              </NavigationLink>
            ) : (
              <NavigationLink link="login">
                <FaUser className="reactIcon" /> Login
              </NavigationLink>
            )}
          </li>

          <li>
            {user_id && user_id !== "" ? (
              <NavigationLink link="more">
                <FaEllipsis className="reactIcon" /> More
              </NavigationLink>
            ) : (
              // <NavigationLink link="login">
              //   <FaEllipsis className="reactIcon" /> More
              // </NavigationLink>
              ""
            )}
          </li>

          {/* if there's not a user logged in */}
          <li className="user-profile-item" onClick={handleProfileOptions}>
            {user_id && user_id !== "null" ? (
              <>
                {[
                  <div className="user-profile-route" key={`${userDTO?.id}`}>
                    <img
                      src={
                        userDTO?.avatar.includes("https")
                          ? userDTO?.avatar
                          : `http://localhost:8080/${userDTO?.avatar}`
                      }
                      alt=""
                      className="icon"
                    />
                    <div className="user-profile-route-info">
                      <p className="info-name">{userDTO?.name}</p>
                      <p className="info-username">@{username}</p>
                    </div>
                    <FaEllipsis className="reactIcon" />
                  </div>,
                ]}
                {showLogout && (
                  <div className="logout-card" onClick={handleProfileOptions}>
                    <button onClick={handleLogout}>
                      {/* <FaSignOutAlt className="reactIcon" /> */}
                      <span>Log out @{username}</span>
                    </button>
                  </div>
                )}
              </>
            ) : (
              null
            )}
          </li>
        </ul>
      </div>
    </aside>
  );
}

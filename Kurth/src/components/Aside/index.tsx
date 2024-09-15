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
import { Link, useNavigate } from "react-router-dom";
import NavigationLink from "../NavigationLink";
import * as User from "../../constants/user";
import { useEffect, useState } from "react";
import { UserDTO } from "../../models/user";

export default function Aside() {
  const user_id = localStorage.getItem("user_id");
  const [userDTO, setUserDTO] = useState<UserDTO>();

  const navigate = useNavigate();

  useEffect(() => {
    User.findById(user_id)
      .then((response) => {
        setUserDTO(response.data);
      })
      .catch((error) => {
        console.error("Error:", error.response.data);
        navigate(`/`);
      });
  }, [user_id]);
  // const handleLogout = () => {
  //   localStorage.removeItem("user_id");
  //   navigate(`/`);
  // };
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
            {user_id && user_id !== "null" ? (
              <NavigationLink link={`profile/${userDTO?.username}`}>
                <FaUser className="reactIcon" /> Profile
              </NavigationLink>
            ) : (
              <NavigationLink link="login">
                <FaUser className="reactIcon" /> Login
              </NavigationLink>
            )}
          </li>

          <li>
            {user_id && user_id !== "null" ? (
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
        </ul>
      </div>
    </aside>
  );
}

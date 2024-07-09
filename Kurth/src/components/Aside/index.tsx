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
import { Link, NavLink, useLocation } from "react-router-dom";
import NavigationLink from "../NavigationLink";

export default function Aside() {
  const location = useLocation();

  return (
    <>
      <aside>
        
        <div className="aside__title">
          <Link to="/">
            <h1>Kurth</h1>
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
              <NavigationLink link="notfound">
                <FaCompass className="reactIcon" />
                Explore
              </NavigationLink>
            </li>
            <li>
              <NavLink
                to={"/notfound" + location.search}
                className={({ isActive }) =>
                  isActive ? "nav-active" : "nav-not-active"
                }
              >
                <FaEnvelope className="reactIcon" /> Messages
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/notfound" + location.search}
                className={({ isActive }) =>
                  isActive ? "nav-active" : "nav-not-active"
                }
              >
                <FaBell className="reactIcon" /> Notifications
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/notfound" + location.search}
                className={({ isActive }) =>
                  isActive ? "nav-active" : "nav-not-active"
                }
              >
                <FaUser className="reactIcon" /> Profile
              </NavLink>
            </li>

            <li>
              <NavLink
                to={"/notfound" + location.search}
                className={({ isActive }) =>
                  isActive ? "nav-active" : "nav-not-active"
                }
              >
                <FaEllipsis className="reactIcon" /> More
              </NavLink>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
}

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
import { Link } from "react-router-dom";
import NavigationLink from "../NavigationLink";

export default function Aside() {
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
            <NavigationLink link="singup">
              <FaUser className="reactIcon" /> Login
            </NavigationLink>
          </li>

          <li>
            <NavigationLink link="notfound">
              <FaEllipsis className="reactIcon" /> More
            </NavigationLink>
          </li>
        </ul>
      </div>
    </aside>
  );
}

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

export default function Aside() {
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
              <FaHome className="reactIcon" />
              <Link to="/home"> Home</Link>
            </li>
            <li>
              <FaSearch className="reactIcon" />
              <a href=""> Search</a>
            </li>
            <li>
              <FaCompass className="reactIcon" />
              <a href=""> Explore</a>
            </li>
            <li>
              <FaEnvelope className="reactIcon" />
              <a href=""> Messages</a>
            </li>
            <li>
              <FaBell className="reactIcon" />
              <a href=""> Notifications</a>
            </li>
            <li>
              <FaUser className="reactIcon" />
              <Link to="/profile"> Profile</Link>
            </li>

            <li>
              <FaEllipsis className="reactIcon" />
              <a href=""> More</a>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
}

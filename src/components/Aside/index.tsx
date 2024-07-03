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

export default function Aside() {
  return (
    <aside>
      <div className="aside__title">
        <h1>Kurth</h1>
      </div>
      <div className="aside__nav">
        <ul>
          <li>
            <FaHome className="reactIcon" />
            <a href=""> Home</a>
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
            <a href=""> Profile</a>
          </li>

          <li>
            <FaEllipsis className="reactIcon" />
            <a href=""> More</a>
          </li>
        </ul>
      </div>
    </aside>
  );
}

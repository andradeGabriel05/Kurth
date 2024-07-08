import { FaShareSquare } from "react-icons/fa";
import { FaComment, FaHeart } from "react-icons/fa6";

export default function Reaction() {
  return (
    <div className="reactions__message">
      <div className="reaction__comment reaction__icon">
        <FaComment />
      </div>
      <div className="reaction__like reaction__icon">
        <FaHeart />
      </div>
      <div className="reaction__share reaction__icon">
        <FaShareSquare />
      </div>
    </div>
  );
}

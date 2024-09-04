import axios from "axios";
import "./style.scss";

import { FaShareSquare } from "react-icons/fa";
import { FaComment, FaHeart } from "react-icons/fa6";
import { useParams } from "react-router-dom";

export default function Reaction() {
  const params = useParams();
  function handleLikeSubmit() {
    axios.put(`http://localhost:8080/message/${params.messageId}/like-count`, {
      //increaseLike
    });
    console.log("Like submitted");
  }

  return (
    <div className="reactions__message">
      <div className="reaction__comment reaction__icon">
        <FaComment />
      </div>
      <div className="reaction__like reaction__icon" onClick={handleLikeSubmit}>
        <FaHeart />
      </div>
      <div className="reaction__share reaction__icon">
        <FaShareSquare />
      </div>
    </div>
  );
}

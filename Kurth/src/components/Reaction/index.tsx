import axios from "axios";
import "./style.scss";

import { FaShareSquare } from "react-icons/fa";
import { FaComment, FaHeart } from "react-icons/fa6";
import { useNavigate, useParams } from "react-router-dom";

export default function Reaction({messageId}) {
  const navigate = useNavigate();
  function handleLikeSubmit() {
    axios.put(`http://localhost:8080/message/${messageId}/like-count`, {
      //increaseLike
    });
    console.log("Like submitted");
    
  }
  function handleReplyButton() {
    //navigate to reply page
    navigate(`/reply/${messageId}`);

    console.log("Reply button clicked");
  }

  return (
    <div className="reactions__message">
      <div className="reaction__comment reaction__icon" onClick={handleReplyButton}>
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

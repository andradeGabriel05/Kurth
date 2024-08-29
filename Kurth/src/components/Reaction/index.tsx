import axios from "axios";
import "./style.scss";

import { FaShareSquare } from "react-icons/fa";
import { FaComment, FaHeart } from "react-icons/fa6";

export default function Reaction() {
  function handleLikeSubmit(){
    axios.put("http://localhost:8080/message/4", {
      likeCount: 2,
    });

    console.log("Like submitted");
  }
  
  return (
    <div className="reactions__message">
      <div className="reaction__comment reaction__icon">
        <FaComment />
      </div>
      <div className="reaction__like reaction__icon"  onClick={handleLikeSubmit}>
        <FaHeart />
      </div>
      <div className="reaction__share reaction__icon">
        <FaShareSquare />
      </div>
    </div>
  );
}

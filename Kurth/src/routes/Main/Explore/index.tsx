import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { MessageDTO } from "../../../models/message";
import MessagePosted from "../../../components/MessagePosted";
import * as MessageService from "../../../constants/message";
import "./style.scss";
import { Link } from "react-router-dom";

export default function Explore() {
  const [message, setMessage] = useState<MessageDTO[]>([]);

  useEffect(() => {
    MessageService.findAllMessagesWithImage()
      .then((response) => {
        console.log(response.data);
        setMessage(response.data);
      })
      .catch((error) => {
        console.error("Error:", error.response.data);
      });
  }, []);

  return (
    <div className="images-container">
      {message &&
        message.map((messages) => (
          <div key={messages.id} className="image-detail">
            <Link to={`/${messages.user.username}/posts/${messages.id}`}>
              <img src={messages.image} alt="" />
            </Link>
          </div>
        ))}
    </div>
  );
}

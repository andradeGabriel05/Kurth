import { FaImage } from "react-icons/fa6";
import "./style.scss";
import axios from "axios";
import { BASE_URL, currentDate } from "../../utils/system";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { UserDTO } from "../../models/user";
import * as User from "../../constants/user";

type Props = {
  message: string;
};

export default function MessagePost({ message }: Props) {
  const [messageForm, setMessageForm] = useState();
  const params = useParams();

  // must improve this in the future
  const user_id = localStorage.getItem("user_id");

  function handleSubmit(event: any) {
    event.preventDefault();

    if (user_id !== null) {
      axios
        .post(`${BASE_URL}/message`, {
          message: messageForm,
          postedAt: currentDate,
          image: null,
          likeCount: 0,
          user: {
            id: user_id,
          },
        })
        .then((response) => {
          console.log("Message posted:", response.data);
          window.location.reload(); // <- this
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }

  function handleReply(event: any) {
    event.preventDefault();
    axios
      .post(`${BASE_URL}/reply`, {
        message: messageForm,
        messageId: params.messageId,
        postedAt: currentDate,
        user: {
          id: user_id,
        },
      })
      .then((response) => {
        console.log("Reply posted:", response.data);
        window.location.reload(); // <- this too
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  function handleInput(event: any) {
    const value = event.target.value;
    setMessageForm(value);
    console.log("Message posted:", value);
  }

  const [userDTO, setUserDTO] = useState<UserDTO>();

  useEffect(() => {
    User.findById(user_id)
      .then((response) => {
        setUserDTO(response.data);
      })
      .catch((error) => {
        console.error("Error:", error.response.data);
      });
  }, [user_id]);

  return (
    <>
      <section className="form-message-post p18">
        <div className="wrapper-form">
          <div className="user-avatar">
            <img
              src={
                userDTO?.avatar
                  ? userDTO.avatar
                  : "https://cdn-icons-png.freepik.com/512/8742/8742495.png"
              }
              alt=""
              className="icon"
            />
          </div>
          <div className="user-form-text">
            <form
              method="post"
              onSubmit={
                message !== "Post your reply" ? handleSubmit : handleReply
              }
            >
              <textarea
                name="messageText"
                id="messageText"
                placeholder={`${message}`}
                onChange={handleInput}
                value={messageForm}
              ></textarea>
              <div className="bottom-submit-message">
                <div className="add-media">
                  <div className="media-upload">
                    <input type="file" id="file" accept="image/*" />
                    <label htmlFor="file" className="custom-file-upload">
                      <FaImage />
                    </label>
                  </div>
                </div>

                <button type="submit">Post message</button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

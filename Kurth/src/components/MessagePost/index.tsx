import { FaImage } from "react-icons/fa6";
import "./style.scss";
import axios from "axios";
import { BASE_URL, currentDate } from "../../utils/system";
import { useState } from "react";

type Props = {
  message: string;
};

export default function MessagePost({ message }: Props) {
  const [messageForm, setMessageForm] = useState();

  // must improve this in the future

  function handleSubmit(event: any) {
    event.preventDefault();
    axios
      .post(`${BASE_URL}/message`, {
        message: messageForm,
        postedAt: currentDate,
        image: "",
        user: {
          id: 1,
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

  function handleInput(event: any) {
    const value = event.target.value;
    setMessageForm(value);
    console.log("Message posted:", value);
  }

  return (
    <>
      <section className="form-message-post p18">
        <div className="wrapper-form">
          <div className="user-avatar">
            <img
              src="https://thispersondoesnotexist.com/"
              alt=""
              className="icon"
            />
          </div>
          <div className="user-form-text">
            <form method="post" onSubmit={handleSubmit}>
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

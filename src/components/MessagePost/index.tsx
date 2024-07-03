import { FaImage } from "react-icons/fa6";
import { MessageDTO } from "../../models/message";
import MessagePosted from "../MessagePosted";
import "./style.scss";
import { user } from "../../constants/user";

const message: MessageDTO = {
  id: 1,
  author: "John",
  avatar: "https://thispersondoesnotexist.com/",
  username: "@thispersondoesnotexist",
  content:
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus placeat alias repellat quas eius nam obcaecati aspernatur nesciunt? Eaque ad architecto labore magnam illo. Deserunt!",
  createdAt: "22/12/2021",
  user: user,
};

export default function MessagePost() {
  return (
    <>
      <section className="form-message-post">
        <label htmlFor="messageText">
          <h1>Post Message</h1>
        </label>
        <div className="wrapper-form">
          <div className="user-avatar">
            <img src="https://thispersondoesnotexist.com/" alt="" />
          </div>
          <div className="user-form-text">
            <form action="" method="post">
              <textarea
                name="messageText"
                id="messageText"
                placeholder="Write anything"
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

      <MessagePosted message={message} />
      <MessagePosted message={message} />
      <MessagePosted message={message} />
    </>
  );
}

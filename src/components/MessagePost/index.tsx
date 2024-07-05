import { FaImage } from "react-icons/fa6";
import "./style.scss";
// import { user } from "../../constants/user";


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
    </>
  );
}

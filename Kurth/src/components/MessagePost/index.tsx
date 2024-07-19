import { FaImage } from "react-icons/fa6";
import "./style.scss";
// import { user } from "../../constants/user";

type Props = {
  message: string;
}

export default function MessagePost({message}: Props) {
  return (
    <>
      <section className="form-message-post p18">
        <div className="wrapper-form">
          <div className="user-avatar">
            <img src="https://thispersondoesnotexist.com/" alt="" className="icon"/>
          </div>
          <div className="user-form-text">
            <form action="" method="post">
              <textarea
                name="messageText"
                id="messageText"
                placeholder={`${message}`}
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

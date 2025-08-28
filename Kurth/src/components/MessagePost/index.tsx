import { FaImage } from "react-icons/fa6";
import "./style.scss";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { UserDTO } from "../../models/user";
import * as User from "../../constants/user";
import * as Message from "../../constants/message";
import { PostDTO } from "../../models/message";

type Props = {
  message: string;
  posts: PostDTO[];
};

export default function MessagePost({ message, posts }: Props) {
  const [messageForm, setMessageForm] = useState<string>("");
  
  const params = useParams();
  const navigate = useNavigate();

  // must improve this in the future
  const user_id: string = localStorage.getItem("user_id") || "";
  const username = localStorage.getItem("username");
  const formattedUsername = username ? username.replace(/['"]+/g, "") : "";

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if(!username) {
      console.error("Username is not set in localStorage.");
      navigate("/login");
      return;
    }

    let imageUrl;
    if (handleImage && messageForm.length > 0) {
      imageUrl = await saveImageLocal(handleImage);
      console.log("Image URL:", imageUrl);
    }


    Message.postMessage(messageForm, imageUrl, user_id)
      .then((response) => {
        console.log("Message posted:", response.data);
        posts.unshift({...response.data});
        console.log("DEPOIS", posts)
      })
      .catch((error) => {
        if (!user_id) {
          console.error("Error:", error);
          navigate("/login");
        }
        if (error.response && error.response.status === 422) {
          alert("Please write a message before posting.");
        }
      });
  }

  function handleReply(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    Message.postReply(messageForm, Number(params.messageId), user_id)
      .then((response) => {
        console.log("Reply posted:", response);
        window.location.reload(); // <- this too
      })
      .catch((error) => {
        console.error("Error:", error);
        navigate("/login");
      });
  }

  async function saveImageLocal(file: File) {
    const formData = new FormData();
    formData.append("image", file);

    const response = await Message.saveImageLocal(formData);
    console.log("Image uploaded:", response.data);
    return response.data;
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

  const [handleImage, setHandleImage] = useState<File | null>(null);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      setHandleImage(file);
      console.log("Selected file from target.files[0]:", file);
    }
  }

  return (
    <>
      <section className="form-message-post p18">
        <div className="wrapper-form">
          <div className="user-avatar">
            <Link
              to={user_id === null ? `/login` : `/profile/${formattedUsername}`}
            >
              {userDTO && userDTO.avatar && userDTO.avatar !== "" ? (
                <img
                  src={
                    userDTO.avatar.includes("https")
                      ? userDTO.avatar
                      : `http://localhost:8080/${userDTO.avatar}`
                  }
                  alt=""
                  className="icon"
                />
              ) : (
                <img
                  src="https://cdn-icons-png.freepik.com/512/8742/8742495.png"
                  alt="Default Avatar"
                  className="icon"
                />
              )}
            </Link>
          </div>
          <div className="user-form-text">
            <form
              method="post"
              onSubmit={
                message === "What do you think about this?"
                  ? handleReply
                  : handleSubmit
              }
            >
              <textarea
                name="messageText"
                id="messageText"
                placeholder={`${message}`}
                onChange={(e) => setMessageForm(e.target.value)}
                value={messageForm}
              ></textarea>
              <div className="bottom-submit-message">
                <div className="media-upload">
                  <input
                    type="file"
                    id="file"
                    accept="image/*"
                    onChange={handleChange}
                  />
                  <label htmlFor="file" className="custom-file-upload">
                    <FaImage />
                  </label>
                </div>
                <button type="submit">Post message</button>
              </div>
              {handleImage && (
                <img
                  className="preview-image"
                  src={URL.createObjectURL(handleImage)}
                  alt={handleImage.name}
                />
              )}
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

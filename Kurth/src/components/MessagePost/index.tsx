import { FaImage } from "react-icons/fa6";
import "./style.scss";
import axios from "axios";
import { BASE_URL, currentDate } from "../../utils/system";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { UserDTO } from "../../models/user";
import * as User from "../../constants/user";

type Props = {
  message: string;
};

export default function MessagePost({ message }: Props) {
  const [messageForm, setMessageForm] = useState<string>("");
  const [handleImageSubmit, setHandleImageSubmit] = useState("");

  const params = useParams();
  const navigate = useNavigate();

  // must improve this in the future
  const user_id = localStorage.getItem("user_id");
  const username = localStorage.getItem("username");
  const formattedUsername = username ? username.replace(/['"]+/g, "") : "";

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    let imageUrl;
    if (handleImage && messageForm.length > 0) {
      imageUrl = await saveImageLocal(handleImage);
      console.log("Image URL:", imageUrl);
    }

    axios
      .post(`${BASE_URL}/message`, {
        message: messageForm,
        postedAt: currentDate,
        image: imageUrl ? `http://localhost:8080/${imageUrl}` : null,
        likeCount: 0,
        user: {
          id: user_id,
        },
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      })
      .then((response) => {
        console.log("Message posted:", response.data);
        window.location.reload(); // <- this
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
    axios
      .post(`${BASE_URL}/message`, {
        message: messageForm,
        postedAt: currentDate,
        likeCount: 0,
        parent: { id: params.messageId },
        isReply: true,
        user: {
          id: user_id,
        },
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      })
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

    const response = await axios.post(
      `${BASE_URL}/message/upload-image`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
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
              <img
                src={
                  userDTO?.avatar
                    ? userDTO.avatar
                    : "https://cdn-icons-png.freepik.com/512/8742/8742495.png"
                }
                alt=""
                className="icon"
              />
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

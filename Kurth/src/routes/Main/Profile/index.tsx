import "./style.scss";
import ProfileContentDetails from "../../../components/ProfileContentDetails";
import ProfileHeader from "../../../components/ProfileHeader";
import { Link, useParams } from "react-router-dom";
import * as UserService from "../../../constants/user";
import * as MessageService from "../../../constants/message";
import { UserDTO } from "../../../models/user";
import { useEffect, useState } from "react";
import { PostDTO } from "../../../models/message";
import MessagePosted from "../../../components/MessagePosted";
import Reaction from "../../../components/Reaction";
// import { user } from "../../constants/";

export default function Profile() {
  const params = useParams();

  const [user, setUser] = useState<UserDTO>();

  const [message, setMessage] = useState<PostDTO[]>([]);

  const [actualPage, setActualPage] = useState<number>(0);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  //initially load the first page of messages

  function handleScroll() {
    const scrollTop = window.scrollY;
    const windowHeight = window.innerHeight;
    const fullHeight = document.documentElement.scrollHeight;
    const isNearBottom = scrollTop + windowHeight >= fullHeight - 100;

    if (isNearBottom && !isLoading) {
      setIsLoading(true);
      setActualPage((prev) => prev + 1);
    }
  }

  useEffect(() => {
    UserService.findByUsername(params.username as string)
      .then((response) => {
        console.log(response.data);
        setUser(response.data);
      })
      .catch((error) => {
        console.error("Error:", error.response.data);
      });

    MessageService.findUserMessages(params.username as string)
      .then((response) => {
        console.log(response.data);
        setMessage(response.data.content);
      })

      .catch((error) => {
        console.error("Error:", error.response.data);
      });
  }, [params.username, user?.following]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isLoading]);

  useEffect(() => {
    if (actualPage > 0) {
      MessageService.findUserMessages(params.username as string, actualPage)
        .then((response) => {
          console.log(response.data);
          setMessage((prev) => [...prev, ...response.data.content]);
        })
        .catch((error) => {
          console.error("Error:", error.response.data);
        });
    }
  }, [actualPage]);

  console.log("message:", message);

  return (
    <div className="profile-container">
      {user && <ProfileHeader user={user} />}
      <div className="profile-content">
        {user && <ProfileContentDetails user={user} />}
        {/* {user && <ProfileContentActions user={user}/>} */}
      </div>
      {message && message.length === 0 && (
        <div className="no-message">No messages found for this user.</div>
      )}
      {message.map((message) => (
        <div key={message.id} className="message-posted profile-message-posted">
          <Link to={`/${message.user.username}/posts/${message.id}`}>
            <MessagePosted post={message} />
          </Link>
          <Reaction message={message} />
        </div>
      ))}
    </div>
  );
}

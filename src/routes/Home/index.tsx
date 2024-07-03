import Aside from "../../components/Aside";
import MessagePost from "../../components/MessagePost";

export default function Home() {
  return (
    <>
      <div className="container">
        <Aside />
        <div className="message__user">
          <MessagePost />

        </div>
      </div>
    </>
  );
}
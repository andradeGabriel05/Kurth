import MessagePost from "../../../components/MessagePost";
import MessagePosted from "../../../components/MessagePosted";
import * as messageConst from "../../../constants/message";

export default function Home() {
  return (
    <>
        <div className="message__user">
          <MessagePost />

          {messageConst.findAll().map((message) => (
            <MessagePosted key={message.id} message={message} />
          ))}
      </div>
    </>
  );
}

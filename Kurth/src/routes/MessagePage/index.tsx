import Aside from "../../components/Aside";
import { Link, useParams } from "react-router-dom";
import * as MessageConst from "../../constants/message";

export default function MessagePage() {
    const params = useParams();

    const messageId = parseInt(params.messageId as string);
    
    const messageParam = MessageConst.findById(messageId);
    return (
    <>
      <Aside />
      <div className="wrapper-NotFound">

        <h1>{messageParam?.id}</h1>
        <h3>Why dont you try search something else?</h3>

        <div className="wrapper-NotFound-route">
          <Link to="/search">Explore</Link>
        </div>
      </div>
    </>
  );
}

import { Link } from "react-router-dom";
import Aside from "../../components/Aside";
import "./style.scss";

export default function NotFound() {
  return (
    <>
      <Aside />
      <div className="wrapper-NotFound">
        <h1>Page Not Found</h1>
        <h3>Why dont you try search something else?</h3>

        <div className="wrapper-NotFound-route">
          <Link to="/search">Explore</Link>
        </div>
      </div>
    </>
  );
}

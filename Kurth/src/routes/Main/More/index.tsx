import "./style.scss";
import { logout } from "../../../utils/system";

export default function More() {
  

  return (
    <div className="container-more">
      <div className="container-more-box">
        <button onClick={logout}>Log Out</button>
      </div>
    </div>
  );
}

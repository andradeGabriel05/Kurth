import { Link } from "react-router-dom";
import "./style.scss";

export default function More() {
  function logout() {
    localStorage.removeItem("user_id");
    localStorage.removeItem("username");
    localStorage.removeItem("token");
    window.location.href = "/";
  }

  return (
    <div className="container-more">
      <div className="container-more-box">
        <button onClick={logout}>Log Out</button>
      </div>
    </div>
  );
}

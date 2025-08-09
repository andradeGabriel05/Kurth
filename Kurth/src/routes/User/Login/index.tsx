import { Link } from "react-router-dom";
import "./style.scss";
import { useState } from "react";
import { jwtDecode } from "jwt-decode";
import * as User from "../../../constants/user";

export default function Login() {
  const [username, setUsername] = useState<string>("");

  const [password, setPassword] = useState<string>("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await User.loginUser(username, password)
      .then((response) => {
        const decodedToken = jwtDecode(response.data.accessToken);
        if (response.status === 200) {
          localStorage.setItem("username", username);
          localStorage.setItem("token", response.data.accessToken);
          localStorage.setItem("user_id", decodedToken.sub);
          window.location.href = "/";
        }
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          console.error("Invalid credentials");
        }
      });
  }
  return (
    <div className="account-wrapper">
      <div className="left-side">
        <h2 className="left-side-quote">
          "And in the end, the love you take, is equal to the love you make"
        </h2>
        <div className="left-side-logo">
          <h2 className="left-side-logo-welcome-to">Welcome to</h2>

          <div className="left-side-logo-name">
            <h1>Kurth</h1>
          </div>
        </div>
      </div>
      <div className="right-side">
        <div className="right-side-content">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <div className="userData">
                <label htmlFor="userData">Username</label>
                <input
                  type="text"
                  id="userData"
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>

              <div className="userPassword">
                <label htmlFor="userPassword">Password</label>
                <input
                  type="password"
                  id="userPassword"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <button type="submit">Login</button>
            <div className="dont-have-account">
              <span>
                Don't have an account? <Link to="/signup">Sign up</Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

import { Link } from "react-router-dom";
import "./style.scss";
import { currentDate } from "../../../utils/system";
import { jwtDecode } from "jwt-decode";
import * as User from "../../../constants/user";
import { useState } from "react";


export default function Account() {

    const [userDetails, setUserDetails] = useState({
      name: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: ""
    });

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // hope anyone doesn't saw this

    await User.registerUser(
      userDetails.name,
      userDetails.username,
      userDetails.email,
      currentDate,
      userDetails.password
    ).then((response) => {
      console.log("User created:", response);

      const decodedToken: { sub: string } = jwtDecode(response.data.accessToken);

      localStorage.setItem("user_id", decodedToken.sub);
      localStorage.setItem("username", username.value);
      window.location.href = "/";
    })
      .catch((error) => {
        console.error("Error:", error);
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
          <span className="right-side-content-title">
            <Link to="/">Kurth</Link>
          </span>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <div className="name-oder">
                <div className="name">
                  <label htmlFor="name">Name</label>
                  <input type="text" id="name" onChange={(e) => setUserDetails({...userDetails, name: e.target.value})} />
                </div>
                <div className="username">
                  <label htmlFor="username">Username</label>
                  <input type="text" id="username" onChange={(e) => setUserDetails({...userDetails, username: e.target.value})} />
                </div>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" onChange={(e) => setUserDetails({...userDetails, email: e.target.value})} />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" onChange={(e) => setUserDetails({...userDetails, password: e.target.value})} />
            </div>
            <div className="form-group">
              <label htmlFor="password2">Confirm Password</label>
              <input type="password" id="password2" onChange={(e) => setUserDetails({...userDetails, confirmPassword: e.target.value})} />
            </div>
            <button type="submit">Create account</button>
          </form>
          <div className="already-have-account">
            <span>
              Already have an account? <Link to="/login">Log in</Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

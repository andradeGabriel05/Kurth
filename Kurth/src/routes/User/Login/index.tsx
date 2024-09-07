import { Link } from "react-router-dom";
import "./style.scss";
import axios from "axios";
import { BASE_URL, currentDate } from "../../../utils/system";

function handleSubmit(event: any) {
  event.preventDefault(event);

  const username = userData.value;
  const password = userPassword.value;

  axios.post(`${BASE_URL}/user/login`, {
    username: username,
    password: password,
  }).then((response) => {
    console.log(response);
    // Redirect to home page
    window.location.href = "/";
  }).catch((error) => {
    console.error("Error:", error);
  });
}
export default function Login() {
  return (
    <div className="account-wrapper">
      <div className="left-side">
        <h2 className="left-side-quote">
          "And in the end, the love you take, is equal to the love you make"
        </h2>
        <div className="left-side-logo">
          <h2 className="left-side-logo-welcome-to">Welcome to</h2>

          <Link to="/">
            <h1>Kurth</h1>
          </Link>
        </div>
        <div className="delete">
          <p>For the future!!!!!!!!!!!!!!</p>
          <p>Page not working!!!!!!!!!!!!</p>
        </div>
      </div>
      <div className="right-side">
        <div className="right-side-content">
          {/* <h1>Login</h1> */}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <div className="userData">
                <label htmlFor="userData">Username</label>
                <input type="text" id="userData" />
              </div>

              <div className="form-group">
                <div className="userPassword">
                  <label htmlFor="userPassword">Password</label>
                  <input type="text" id="userPassword" />
                </div>
              </div>
            </div>

            <button type="submit">
              Create account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

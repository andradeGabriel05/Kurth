import { Link } from "react-router-dom";
import "./style.scss";
import axios from "axios";
import { BASE_URL } from "../../../utils/system";

async function handleSubmit(event: any) {
  event.preventDefault(event);

  const username = userData.value;
  const password = userPassword.value;

  const response = await axios.post(`${BASE_URL}/user/login`, {
    username: username,
    password: password,
  });

  console.log(response);

  

  localStorage.setItem("user_id", JSON.stringify(response.data.id));
  // Redirect to home page
  window.location.href = "/";
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

              <div className="userPassword">
                <label htmlFor="userPassword">Password</label>
                <input type="text" id="userPassword" />
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

import { Link } from "react-router-dom";
import "./style.scss";
import { currentDate } from "../../../utils/system";
import { jwtDecode } from "jwt-decode";
import * as User from "../../../constants/user";

async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
  event.preventDefault();

  // i'm lazy right now, so i will use document.getElementById to get the values
  // but in the future, i will use useState to manage the form state
  const name = document.getElementById("name") as HTMLInputElement;
  const username = document.getElementById("username") as HTMLInputElement;
  const email = document.getElementById("email") as HTMLInputElement;
  const password = document.getElementById("password") as HTMLInputElement;

  await User.registerUser(
    name.value,
    username.value,
    email.value,
    currentDate,
    password.value
  ).then((response) => {
    console.log("User created:", response.data);

      const decodedToken: { sub: string } = jwtDecode(response.data.accessToken);

      localStorage.setItem("user_id", decodedToken.sub);
      localStorage.setItem("username", username.value);
      localStorage.setItem("token", response.data.accessToken);
      window.location.href = "/";
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

export default function Account() {
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
                  <input type="text" id="name" />
                </div>
                <div className="username">
                  <label htmlFor="username">Username</label>
                  <input type="text" id="username" />
                </div>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" />
            </div>
            <div className="form-group">
              <label htmlFor="password2">Confirm Password</label>
              <input type="password" id="password2" />
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

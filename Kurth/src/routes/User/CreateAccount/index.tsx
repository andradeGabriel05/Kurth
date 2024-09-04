import { Link } from "react-router-dom";
import "./style.scss";
import axios from "axios";
import { BASE_URL, currentDate } from "../../../utils/system";

function handleSubmit(event: any) {
  event.preventDefault();
  axios
    .post(`${BASE_URL}/user`, {
      name: "John Doe",
      username: "@JhonDoee",
      email: "john.doe@example.com",
      createdAt: currentDate,
      password: "password123",
      bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel velit at justo tincidunt posuere eu in nunc. Sed gravida, nunc a ullamcorper viverra, metus erat consectetur libero, in consectetur neque risus vel velit.",
      avatar: "https://thispersondoesnotexist.com/",
      followers: 0,
      following: 0,
      posts: 0,
    })
    .then((response) => {
      console.log("User created:", response.data);
      window.location.reload()
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
          <h1>Create account</h1>

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
        </div>
      </div>
    </div>
  );
}

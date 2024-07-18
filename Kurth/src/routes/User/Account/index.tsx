import { Link } from "react-router-dom";
import "./style.scss";

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
          <form>
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

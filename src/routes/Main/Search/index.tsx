import "./style.scss";
import SearchBar from "../../../components/SearchBar";
import * as User from "../../../constants/user";
import { Link } from "react-router-dom";

export default function Search() {
  return (
    <div className="container-search">
      <SearchBar />

      <div className="wrapper-search">
        {User.findAll().map((user) => (
          <div key={user.id} className="user-icon">
            <Link to={`/profile/${user.username}`}>
              <img src={user.avatar} alt={user.username} className="icon" />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

import "./style.scss";
import SearchBar from "../../../components/SearchBar";
import * as User from "../../../constants/user";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { UserDTO } from "../../../models/user";

export default function Search() {
  const [user, setUser] = useState<UserDTO[]>([]);
  useEffect(() => {
    User.findAll().then((response) => {
      console.log(response.data.content);
      setUser(response.data.content);
    });
  }, []);

  return (
    <div className="container-search">
      <SearchBar />

      <div className="wrapper-search">
        {user && user.map((user =>
          <div key={user.id} className="user-icon">
            <Link to={`/${user.username}`}>
              <img src={user.avatar} alt={user.username} className="icon" />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

import "./style.scss";
import SearchBar from "../../../components/SearchBar";
import * as User from "../../../constants/user";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { UserDTO } from "../../../models/user";
import ProfileContentActions from "../../../components/ProfileContentActions";

export default function Search() {
  const [user, setUser] = useState<UserDTO[]>([]);

  const [searchUser, setSearchUser] = useState("");

  useEffect(() => {
    User.findPageRequest(0, searchUser)
    .then((response) => {
      console.log(response.data.content);
      setUser(response.data.content);
    });
  }, [searchUser]);

  function handleSearch(searchText: string) {
    console.log(searchText);
    return setSearchUser(searchText);
  }

  return (
    <div className="container-search">
      <SearchBar onSearch={handleSearch} />

      <div className="wrapper-search">
        {user &&
          user.map((user) => (
            <div key={user.id} className="user-icon">
              <Link to={`/profile/${user.username}`}>
                <img src={user.avatar} alt={user.username} className="icon" />
                <div className="user-section">
                  <div className="user-section-username">
                    <p>{user.name}</p>
                  </div>

                  <div className="user-section-username">
                    <p>{user.username}</p>
                  </div>
                </div>
              </Link>

              <div className="follow-button">
                <ProfileContentActions />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

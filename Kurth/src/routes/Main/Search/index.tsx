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

  const userLoggedInId = localStorage.getItem("user_id");

  useEffect(() => {
    User.findPageRequest(0, searchUser).then((response) => {
      console.log(response.data.content);
      setUser(response.data.content);
    });
  }, [searchUser]);

  function handleSearch(searchText: string) {
    console.log(searchText);
    return setSearchUser(searchText);
  }

  // fetch('http://localhost:8080/likecount/1')
  //   .then(response => {
  //     if (!response.ok) {
  //       throw new Error('Network response was not ok ' + response.statusText);
  //     }
  //     return response.json(); // ou response.text() se a resposta não for JSON
  //   })
  //   .then(data => {
  //     console.log(data); // Aqui você pode manipular os dados recebidos
  //   })
  //   .catch(error => {
  //     console.error('There was a problem with the fetch operation:', error);
  //   });

  return (
    <div className="container-search">
      <SearchBar onSearch={handleSearch} />

      <div className="wrapper-search">
        {user &&
          user.map((user) => (
            <div key={user.id} className="user-icon">
              <Link to={`/profile/${user.username}`}>
                <img src={user.avatar === null ? "https://cdn-icons-png.freepik.com/512/8742/8742495.png" : user.avatar} alt={user.username} className="icon" />
                <div className="user-section">
                  <div className="user-section-username">
                    <p>{user.name}</p>
                  </div>

                  <div className="user-section-username">
                    <p>@{user.username}</p>
                  </div>
                </div>
              </Link>

              <div className="follow-button">
                <ProfileContentActions userLoggedInId={userLoggedInId} userId={user.id} />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

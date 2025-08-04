import { BrowserRouter, Route, Routes, useParams } from "react-router-dom";
import Profile from "./routes/Main/Profile/index.tsx";

import Home from "./routes/Main/Home/index.tsx";
import Main from "./routes/Main/index.tsx";
import NotFound from "./routes/NotFound/index.tsx";
import Search from "./routes/Main/Search/index.tsx";
import MessagePage from "./routes/Main/MessagePage/index.tsx";
import Account from "./routes/User/CreateAccount/index.tsx";
import Login from "./routes/User/Login/index.tsx";
import Explore from "./routes/Main/Explore/index.tsx";
import More from "./routes/Main/More/index.tsx";
import Likes from "./routes/Main/Profile/Likes/index.tsx";
import Following from "./routes/Main/Following/index.tsx";
import { UserDTO } from "./models/user.ts";
import { useEffect, useState } from "react";

import * as User from "./constants/user.ts";
import EditProfile from "./routes/Main/Profile/Edit Profile/index.tsx";

export default function App() {
  //tomorrow: improve the use of findById on aside and messagePost... Try to get only here and pass as props?

  const params = useParams();

  const user_id: string = localStorage.getItem("user_id") || "";
  const username = params.username;

  const [userDTO, setUserDTO] = useState<UserDTO>();
  // const [user, setUser] = useState<UserDTO>();

  // const navigate = useNavigate();

  useEffect(() => {
    User.findById(user_id).then((response) => {
      setUserDTO(response.data);
    });
  }, [username, user_id]);

  return (
    <div className="container">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />}>
            <Route index element={<Home />} />
            <Route path="home" element={<Home />} />
            <Route
              path="following"
              element={userDTO ? <Following user={userDTO} /> : null}
            />
            <Route path="search" element={<Search />} />
            <Route path="explore" element={<Explore />} />
            <Route
              path={`:username/posts/:messageId`}
              element={<MessagePage />}
            />

            <Route path="profile/:username" element={<Profile />} />
            <Route
              path="profile/:username/likes"
              element={userDTO ? <Likes user={userDTO} /> : null}
            />
            <Route path="more" element={<More />} />
          </Route>
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Account />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

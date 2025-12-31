import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useParams,
} from "react-router-dom";
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
import FollowingList from "./routes/Main/Profile/FollowingList/index.tsx";
import FollowerList from "./routes/Main/Profile/FollowerList/index.tsx";
import { logout } from "./utils/system.ts";
import PrivateRoute from "./routes/Main/PrivateRoute/index.tsx";

export default function App() {
  const [userDTO, setUserDTO] = useState<UserDTO>();

  useEffect(() => {
    User.findMe()
      .then((response) => {
        setUserDTO(response.data);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, []);



  return (
    <div className="container">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            <PrivateRoute>
              <Main />
            </PrivateRoute>}>
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
            <Route
              path="profile/:username/following"
              element={<FollowingList />}
            />

            <Route
              path="profile/:username/followers"
              element={<FollowerList />}
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

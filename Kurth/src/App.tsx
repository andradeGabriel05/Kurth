import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
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

// import * as User from "./constants"

export default function App() {
  //tomorrow: improve the use of findById on aside and messagePost... Try to get only here and pass as props?
  // const user_id = localStorage.getItem("user_id");

  // const [userDTO, setUserDTO] = useState<UserDTO>();

  // const navigate = useNavigate();

  // useEffect(() => {
  //   User.findById(user_id)
  //     .then((response) => {
  //       setUserDTO(response.data);
  //     })
  //     .catch((error) => {
  //       console.error("Error:", error.response.data);
  //       navigate(`/`);
  //     });
  // }, [user_id]);

  return (
    <div className="container">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />}>
            <Route index element={<Home />} />
            <Route path="home" element={<Home />} />
            <Route path="search" element={<Search />} />
            <Route path="explore" element={<Explore />} />
            <Route
              path={`:username/posts/:messageId`}
              element={<MessagePage />}
            />

            <Route path="profile/:username" element={<Profile />} />
            <Route path="profile/:username/likes" element={<Likes />} />
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

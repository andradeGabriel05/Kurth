import { BrowserRouter, Route, Routes } from "react-router-dom";
import Profile from "./routes/Main/Profile/index.tsx";

import Home from "./routes/Main/Home/index.tsx";
import Main from "./routes/Main/index.tsx";
import NotFound from "./routes/NotFound/index.tsx";
import Search from "./routes/Main/Search/index.tsx";
import MessagePage from "./routes/MessagePage/index.tsx";
// import * as User from "./constants" 

export default function App() {
  return (
    <>
      <div className="container">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Main />}>
              <Route index element={<Home />} />
              <Route path="home" element={<Home />} />
              <Route path="search" element={<Search />} />
              <Route path="username/:messageId" element={<MessagePage />} />

              <Route path="profile/:username" element={<Profile />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

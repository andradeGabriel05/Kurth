import { BrowserRouter, Route, Routes } from "react-router-dom";
import Profile from "./routes/Main/Profile/index.tsx";

import Home from "./routes/Main/Home/index.tsx";
import Main from "./routes/Main/index.tsx";

export default function App() {
  return (
    <>
      <div className="container">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Main />}>
              <Route index element={<Home />} />
              <Route path="home" element={<Home />} />

              <Route path="profile/:username" element={<Profile />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

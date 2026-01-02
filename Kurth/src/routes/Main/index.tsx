import { Outlet, useNavigate } from "react-router-dom";
import Aside from "../../components/Aside";
import { isAuthenticated } from "../../constants/user";
import { useEffect } from "react";

export default function Main() {

    return (
      <>
        <Aside />
        <Outlet />
      </>
    );
  }
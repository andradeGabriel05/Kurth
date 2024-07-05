import { Outlet } from "react-router-dom";
import Aside from "../../components/Aside";

export default function Main() {
    return (
      <>
        <Aside />
        <Outlet />
      </>
    );
  }
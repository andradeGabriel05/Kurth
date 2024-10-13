import { NavLink, useLocation } from "react-router-dom";
import "./style.scss";

type Props = {
  link: string;
  children: (string | JSX.Element)[];
};

export default function NavigationLink({ link, children }: Props) {
  const location = useLocation();

  return (
    <li>
      <NavLink
        to={`/${link}` + location.search}
        className={({ isActive }) =>
          isActive ? "nav-active" : "nav-not-active"
        }
      >
        {children}
      </NavLink>
    </li>
  );
}

import { NavLink, useLocation } from "react-router-dom";
import "./style.scss";

type Props = {
  link: string;
  children: (string | JSX.Element)[];
  profile?: boolean;
};

export default function NavigationLink({ link, children, profile }: Props) {
  const location = useLocation();

  return (
    profile ? (
      <NavLink
        to={`/${link}`}
        end
        className={({ isActive }) =>
          isActive ? "profile-page-active" : "profile-page-not-active"
        }
      >
        {children}
      </NavLink>
    ) : (
      <NavLink
        to={`/${link}` + location.search}
        className={({ isActive }) =>
          isActive ? "nav-active" : "nav-not-active"
        }
      >
        {children}
      </NavLink>
    )
  );
}

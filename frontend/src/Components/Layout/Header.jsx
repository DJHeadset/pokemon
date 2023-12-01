import { Link, Outlet, useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

import "./Header.css";

function Header() {
  let page = useLocation();
  let pageString = page.pathname.slice(1);
  let slashNumber = pageString.indexOf("/");
  let pageName, user;

  if (slashNumber > 0) {
    pageName = pageString.substring(0, slashNumber);
  } else {
    pageName = pageString;
  }

  if (pageName === "") {
    pageName = "Welcome";
  } else {
    pageName = pageName.charAt(0).toUpperCase() + pageName.slice(1);
  }

  if (document.cookie) {
    const decodedCookie = jwtDecode(
      document.cookie.substring(5, document.cookie.length)
    );
    user = decodedCookie.username;
  }

  return (
    <div className="Header">
      <nav>
        <ul>
          <li className="grow">
            <Link to="/">HOME</Link>
          </li>
          <li className="grow location-title">{pageName}</li>
          <li>
            <Link to="/login">{user ? user : "LOGIN"}</Link>
          </li>
        </ul>
      </nav>
      <Outlet />
    </div>
  );
}

export default Header;

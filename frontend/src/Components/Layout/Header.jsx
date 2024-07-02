import { Link, Outlet, useLocation } from "react-router-dom";
import logo from "../../resources/pic/logo.png";
import "./Header.css";
import decoder from "../../service/Decoder";

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

  const cookie = decoder();
  if (cookie) {
    user = cookie.username;
  }

  return (
    <div className="Header">
      <nav>
        <ul>
          <li className="grow">
            <Link to="/">
              <img src={logo} alt="Logo" style={{ height: "32px" }} />
            </Link>
          </li>
          <li className="grow location-title">{pageName}</li>
          <li>
            <Link to="/user">{user ? user : "LOGIN"}</Link>
          </li>
        </ul>
      </nav>
      <Outlet />
    </div>
  );
}

export default Header;

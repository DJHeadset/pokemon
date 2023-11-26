import "../App.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import decoder from "./Decoder";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  function redirect(role) {
    if (role === "Basic") {
      navigate("/user");
    } else if (role === "admin") {
      navigate("/admin");
    }
  }

  const onSubmit = (e) => {
    e.preventDefault();
    const user = {
      username: username,
      password: password,
    };
    fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "same-origin",
      body: JSON.stringify(user),
    }).then((res) => {
      if (res.ok) {
        const cookie = decoder();
        redirect(cookie.role);
      } else {
        res.json().then((data) => window.alert(data.message));
      }
    });
  };

  return (
    <>
      <form id="loginForm" onSubmit={onSubmit}>
        <div>
          <label>
            Username:
            <input
              type="text"
              value={username}
              placeholder="Enter your username..."
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Password:
            <input
              type="password"
              value={password}
              placeholder="Enter your password..."
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
        </div>
        <div>
          <button type="submit" className="pokemon-btn">
            Submit
          </button>
          <button className="pokemon-btn">Cancel</button>
        </div>
      </form>
      <div>
        Not a member yet?
        <Link to="/register">REGISTER</Link>
      </div>
    </>
  );
}

export default Login;

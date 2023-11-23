import "../App.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function decoder() {
    if (document.cookie) {
      const decodedCookie = jwtDecode(
        document.cookie.substring(6, document.cookie.length - 1)
      );
      console.log(decodedCookie);
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
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        decoder();
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

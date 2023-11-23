import { useState } from "react";
import "../App.css";
import { Link } from "react-router-dom";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userDob, setUserDob] = useState("");
  const [userEmail, setUserEmail] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    const data = { username, password };
    console.log(data);
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
          <label>
            Date of birth:
            <input
              type="date"
              value={userDob}
              onChange={(e) => setUserDob(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Email:
            <input
              type="email"
              value={userEmail}
              placeholder="Enter your email..."
              onChange={(e) => setUserEmail(e.target.value)}
            />
          </label>
        </div>
        <div>
          <input type="checkbox" id="TaC" />
          <label>I have read the Terms and Conditions</label>
        </div>
        <div>
          <button type="submit" className="pokemon-btn">
            Submit
          </button>
          <Link to="/">
            <button className="pokemon-btn">Cancel</button>
          </Link>
        </div>
      </form>
    </>
  );
}

export default Register;

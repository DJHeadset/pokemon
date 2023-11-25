import { useState } from "react";
import "../App.css";
import { Link } from "react-router-dom";

function Register() {
  const [username, setUsername] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [userDob, setUserDob] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [checked, setChecked] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    if(!checked) {
      window.alert("Please read the Terms and Conditions")
    } else  if (password1 !== password2) {
      window.alert("Passwords don't match")
    } else {
      let password = password1
      const user = { username, password, userDob, userEmail };
      fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "same-origin",
        body: JSON.stringify(user),
      })
      .then((res) => res.json())
      .then((data) => window.alert(data.message))
    }
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
              value={password1}
              placeholder="Enter your password..."
              onChange={(e) => setPassword1(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Password again:
            <input
              type="password"
              value={password2}
              placeholder="Enter your password..."
              onChange={(e) => setPassword2(e.target.value)}
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
          <input
            type="checkbox"
            id="TaC"
            onChange={() => setChecked(!checked)}
          />
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

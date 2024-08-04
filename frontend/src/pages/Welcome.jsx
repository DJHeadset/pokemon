import { useState } from "react";
import "../Welcome.css";
import decoder from "../utils/Decoder";
import { useNavigate } from "react-router-dom";

function Welcome() {
  const [registerUserName, setRegisterUserName] = useState("");
  const [registerPassword1, setRegisterPassword1] = useState("");
  const [registerPassword2, setRegisterPassword2] = useState("");
  const [userDob, setUserDob] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [checked, setChecked] = useState(false);
  const [loginName, setLoginName] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [isLoginActive, setIsLoginActive] = useState(true);

  const navigate = useNavigate();

  function redirect(role) {
    if (role === "Basic") {
      navigate("/user");
    } else if (role === "admin") {
      navigate("/admin");
    }
  }

  const handleToggle = () => {
    setIsLoginActive((prev) => !prev);
    const container = document.getElementById("container");
    container.classList.toggle("active");
  };

  const onSubmitRegister = (e) => {
    e.preventDefault();
    if (!checked) {
      window.alert("Please read the Terms and Conditions");
    } else if (registerPassword1 !== registerPassword2) {
      window.alert("Passwords don't match");
    } else {
      let password = registerPassword1;
      const user = {
        username: registerUserName,
        password,
        userDob,
        userEmail,
      };
      fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "same-origin",
        body: JSON.stringify(user),
      }).then((res) => {
        if (res.status === 201) {
          navigate("/starterpack");
        } else {
          res.json().then((data) => window.alert(data.message));
        }
      });
    }
  };

  const onSubmitlogin = (e) => {
    e.preventDefault();
    const user = {
      username: loginName,
      password: loginPassword,
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
    <div
      className={`container ${isLoginActive ? "active" : ""}`}
      id="container"
    >
      <div
        className={`form-container sign-up ${isLoginActive ? "hidden" : ""}`}
      >
        <form onSubmit={onSubmitRegister}>
          <h1>Create Account</h1>
          <div>
            <label>
              Username:
              <input
                type="text"
                value={registerUserName}
                placeholder="Enter your username..."
                onChange={(e) => setRegisterUserName(e.target.value)}
              />
            </label>
          </div>
          <div>
            <label>
              Password:
              <input
                type="password"
                value={registerPassword1}
                placeholder="Enter your password..."
                onChange={(e) => setRegisterPassword1(e.target.value)}
              />
            </label>
          </div>
          <div>
            <label>
              Password again:
              <input
                type="password"
                value={registerPassword2}
                placeholder="Enter your password..."
                onChange={(e) => setRegisterPassword2(e.target.value)}
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
          <div style={{ display: "flex" }}>
            <input
              type="checkbox"
              id="TaC"
              style={{ width: "70px" }}
              onChange={() => setChecked(!checked)}
            />
            <label>I have read the Terms and Conditions</label>
          </div>
          <div>
            <button className="pokemon-btn" type="submit">
              Submit
            </button>
            <button className="pokemon-btn">Cancel</button>
          </div>
        </form>
      </div>
      <div
        className={`form-container sign-in ${isLoginActive ? "" : "hidden"}`}
      >
        <form onSubmit={onSubmitlogin}>
          <h1>Sign In</h1>
          <div>
            <label>
              Username:
              <input
                type="text"
                value={loginName}
                placeholder="Enter your username..."
                onChange={(e) => setLoginName(e.target.value)}
              />
            </label>
          </div>
          <div>
            <label>
              Password:
              <input
                type="password"
                value={loginPassword}
                placeholder="Enter your password..."
                onChange={(e) => setLoginPassword(e.target.value)}
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
      </div>
      <div className="toggle-container">
        <div className="toggle">
          <div
            className={`toggle-panel toggle-left ${
              isLoginActive ? "" : "active"
            }`}
          >
            <h1>Welcome Back!</h1>
            <p>Enter your personal details to use all of site features</p>
            <button className="hidden" id="login" onClick={handleToggle}>
              Sign In
            </button>
          </div>
          <div
            className={`toggle-panel toggle-right ${
              isLoginActive ? "active" : ""
            }`}
          >
            <h1>Hello, Friend!</h1>
            <p>
              Register with your personal details to use all of site features
            </p>
            <button className="hidden" id="register" onClick={handleToggle}>
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Welcome;

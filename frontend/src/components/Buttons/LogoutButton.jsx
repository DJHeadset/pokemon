import { useNavigate } from "react-router-dom";

function LogoutButton({ userId }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    fetch("/api/auth/logout", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ userId: userId }),
    });
    navigate("/");
  };

  return (
    <button className="pokemon-btn" onClick={handleLogout}>
      Logout
    </button>
  );
}

export default LogoutButton;

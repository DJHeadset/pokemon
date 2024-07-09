import { useNavigate } from "react-router-dom";

function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = () => {
    fetch("/api/auth/logout");
    navigate("/");
  };

  return (
    <button className="pokemon-btn" onClick={handleLogout}>
      Logout
    </button>
  );
}

export default LogoutButton;

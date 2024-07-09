import { useNavigate } from "react-router-dom";
import useUserData from "../../hooks/useUserData";

function AdminButton() {
  const { user } = useUserData();
  const navigate = useNavigate();

  if (user) {
    return (
      <>
        {user.role === "admin" && (
          <button className="pokemon-btn" onClick={() => navigate("/admin")}>
            ADMIN PAGE
          </button>
        )}
      </>
    );
  }
}

export default AdminButton;

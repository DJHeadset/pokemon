import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { fetchUserData } from "../services/userService";

const useUserData = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const getUserData = useCallback(async () => {
    const userData = await fetchUserData();
    if (userData === null) {
      window.alert("User is not logged in");
      navigate("/");
    } else {
      setUser(userData);
      setLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    getUserData();
  }, [getUserData]);

  return { user, loading, setUser, setLoading, fetchUserData };
};

export default useUserData;

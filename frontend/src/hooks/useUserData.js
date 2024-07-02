import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import decoder from "../service/Decoder";

const useUserData = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchUserData = useCallback(async () => {
    const cookie = decoder();
    if (cookie === undefined) {
      return null;
    } else {
      const response = await fetch("/api/auth/getuser");
      return response.json();
    }
  }, []);

  const getUserData = useCallback(async () => {
    const userData = await fetchUserData();
    if (userData === null) {
      window.alert("User is not logged in");
      navigate("/");
    } else {
      setUser(userData);
      setLoading(false);
    }
  }, [fetchUserData, navigate]);

  useEffect(() => {
    getUserData();
  }, [getUserData]);

  return { user, loading, setUser, setLoading, fetchUserData };
};

export default useUserData;

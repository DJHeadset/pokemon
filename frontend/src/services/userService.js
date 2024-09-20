import decoder from "../utils/Decoder";

export const fetchUserList = async () => {
  try {
    const response = await fetch("/api/auth/getusers", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch users: ${response.statusText}`);
    }
    const data = await response.json();
    return data.user;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const fetchUserData = async () => {
  const cookie = decoder();
  if (cookie === undefined) {
    return null;
  } else {
    const response = await fetch("/api/auth/getuser");
    return response.json();
  }
};

export const upgradeUser = async (id) => {
  try {
    const response = await fetch("/api/auth/update", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ role: "admin", id }),
    });
    if (response.status !== 201) {
      throw new Error(`Upgrade failed: ${response.statusText}`);
    }
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const deleteUser = async (id) => {
  try {
    const response = await fetch("/api/auth/deleteUser", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ id }),
    });
    if (response.status !== 201) {
      throw new Error(`Delete failed: ${response.statusText}`);
    }
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

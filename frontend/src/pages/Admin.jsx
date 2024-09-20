import { useEffect, useState } from "react";
import {
  deleteUser,
  fetchUserList,
  upgradeUser,
} from "../services/userService";

function Admin() {
  const [users, setUsers] = useState(null);

  async function onUpgrade(id) {
    const success = await upgradeUser(id);
    if (success) {
      loadUsers();
    } else {
      console.error("Failed to upgrade user.");
    }
  }

  async function onDelete(id) {
    if (window.confirm("Are you sure you want to delete this user?")) {
      const success = await deleteUser(id);
      if (success) {
        loadUsers();
      } else {
        console.error("Failed to delete user.");
      }
    }
  }

  const loadUsers = async () => {
    const usersData = await fetchUserList();
    setUsers(usersData);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    users && (
      <>
        <div>ADMIN</div>
        <table>
          <thead>
            <tr>
              <th style={{ width: 200, textAlign: "left" }}>Username</th>
              <th style={{ width: 100, textAlign: "left" }}>Role</th>
              <th style={{ width: 50, textAlign: "center" }}>Online</th>
              <th style={{ width: 100, textAlign: "center" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.username}</td>
                <td>{user.role}</td>
                <td style={{ textAlign: "center" }}>
                  <span
                    style={{
                      display: "inline-block",
                      width: "10px",
                      height: "10px",
                      borderRadius: "50%",
                      backgroundColor: user.online ? "green" : "red",
                    }}
                  ></span>
                </td>
                <td>
                  {user.role !== "admin" ? (
                    <button onClick={() => onUpgrade(user.id)}>UPGRADE</button>
                  ) : (
                    <div style={{ textAlign: "center" }}>ADMIN</div>
                  )}
                </td>
                <td>
                  <button onClick={() => onDelete(user.id)}>DELETE</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    )
  );
}

export default Admin;

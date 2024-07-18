import { useEffect, useState } from "react";

function Admin() {
  const [users, setUsers] = useState(null);

  function onUpgrade(id) {
    const user = {
      role: "admin",
      id: id,
    };
    fetch("/api/auth/update", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      credentials: "include",
      body: JSON.stringify(user),
    }).then((response) => {
      if (response.status === 201) {
        fetchUserList();
      } else {
        console.error("Upgrade failed:", response.statusText);
      }
    });
  }

  function onDelete(id) {
    let answer = window.confirm("are you sure you want to delete user?");
    if (answer) {
      fetch("api/auth/deleteUser", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ id: id }),
      }).then((response) => {
        if (response.status === 201) {
          fetchUserList();
        } else {
          console.error("Upgrade failed:", response.statusText);
        }
      });
    }
  }

  const fetchUserList = () => {
    fetch("/api/auth/getusers")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data.user);
      });
  };

  useEffect(() => {
    fetchUserList();
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

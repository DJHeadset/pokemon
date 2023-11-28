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
    });
  }

  function onDelete(id) {
    fetch("api/auth/deleteUser", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ id: id }),
    });
  }

  useEffect(() => {
    fetch("/api/auth/getusers")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data.user);
        console.log(users);
      });
  }, []);

  return (
    users && (
      <>
        <div>ADMIN</div>
        <table>
          <thead>
            <tr>
              <th>Username</th>
              <th>user Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.username}</td>
                <td>{user.role}</td>
                <td>
                  <button onClick={() => onUpgrade(user.id)}>UPGRADE</button>
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

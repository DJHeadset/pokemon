import { useEffect, useState } from "react";

function Admin() {
  const [users, setUsers] = useState(null);

  useEffect(() => {
    fetch("/api/auth/getusers")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data.user);
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
                  <button>UPGRADE</button>
                </td>
                <td>
                  <button>DELETE</button>
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

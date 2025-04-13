// src/pages/UserList.jsx
import { useEffect, useState } from "react";
import "../styles/Form.css";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/users`, {
          credentials: "include",
        });

        if (res.ok) {
          const data = await res.json();
          setUsers(data.users);
        } else {
          setMessage("Autenticazione necessaria o errore nel caricamento utenti.");
        }
      } catch (err) {
        setMessage("Errore nella connessione al server.");
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="form-container">
      <div className="form-card">
        <h2>Utenti Registrati</h2>
        {message && <p>{message}</p>}
        {users.length === 0 && !message ? (
          <p>Nessun utente registrato.</p>
        ) : (
          <ul>
            {users.map((user, index) => (
              <li key={index}>{user.username}</li>
            ))}
          </ul>
        )}
        <p><a href="/login">Torna al Login</a></p>
      </div>
    </div>
  );
};

export default UserList;

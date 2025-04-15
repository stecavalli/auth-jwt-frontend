// src/pages/UserList.jsx
import { useEffect, useState } from "react";
import { logout } from "../auth/auth";
import { useNavigate, Link } from "react-router-dom";
import "../styles/Form.css";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

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

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const handleDelete = async (usernameToDelete) => {
    const confirmed = window.confirm(`Vuoi davvero eliminare ${usernameToDelete}?`);
    if (!confirmed) return;

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/users/${usernameToDelete}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (res.ok) {
        setUsers(users.filter(user => user.username !== usernameToDelete));
      } else {
        setMessage("Errore durante l'eliminazione dell'utente.");
      }
    } catch (err) {
      setMessage("Errore nella connessione al server.");
    }
  };

  return (
    <div className="form-container">
      <div className="form-card">
        <h2>Utenti Registrati</h2>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <button className="ridotto" onClick={handleLogout}>Logout</button>
          <button className="ridotto" onClick={() => navigate("/profile")}>Profilo</button>
        </div>
        {message && <p>{message}</p>}
        {users.length === 0 && !message ? (
          <p>Nessun utente registrato.</p>
        ) : (
          <ul>
            {users.map((user, index) => (
              <li key={index} style={{ display: "flex", justifyContent: "space-between", margin: "5px 0" }}>
                <span style={{ 
                  display: "inline-block", 
                  padding: "10px", 
                  backgroundColor: "#f0f0f0", 
                  borderRadius: "5px", 
                  cursor: "default" 
                }}>
                  {user.username} {/* Username stilizzato come pulsante, non cliccabile */}
                </span>
                <button onClick={() => handleDelete(user.username)}>Elimina</button>
              </li>
            ))}
          </ul>
        )}
        <Link to="/login">Torna al Login</Link>
      </div>
    </div>
  );
};

export default UserList;


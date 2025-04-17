import { useEffect, useState } from "react";
import { logout, getLoggedInUser } from "../auth/auth";
import { useNavigate, Link } from "react-router-dom";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Stato di caricamento
  const [error, setError] = useState(""); // Stato per eventuali errori
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const currentUser = await getLoggedInUser();
        console.log("Dati utente:", currentUser);
        if (currentUser) {
          setUser(currentUser);
        } else {
          setError("Utente non trovato o non autenticato.");
        }
      } catch (err) {
        setError("Errore nel recupero dei dati utente.");
      } finally {
        setLoading(false); // Finito il caricamento
      }
    };

    fetchUser();
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  if (loading) {
    return <div>Caricamento...</div>; // Mostra un messaggio di caricamento
  }

  return (
    <div>
      {error && <p style={{ color: "red" }}>{error}</p>} {/* Messaggio di errore */}
      
      {user ? (
        <>
          <h2>Benvenuto, {user.username || "utente"}! <br /> La tua email è {user.email}!</h2>
          <button onClick={handleLogout}>Esci</button>
        </>
      ) : (
        <>
          <h2>Devi fare il login per accedere al profilo.</h2>
          <Link to="/login">Vai al login</Link>
        </>
      )}
    </div>
  );
};

export default Profile;

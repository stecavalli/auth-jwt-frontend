// src/pages/Profile.jsx
import { useEffect, useState } from "react";
import { logout, getLoggedInUser } from "../auth/auth";
import { useNavigate, Link } from "react-router-dom";

const Profile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const currentUser = await getLoggedInUser();
      setUser(currentUser);
    };

    fetchUser();
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div>
      {user ? (
        <>
          <h2>Benvenuto, {user.username}!</h2>
          <h2>La tua email è {user.email}!</h2>
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

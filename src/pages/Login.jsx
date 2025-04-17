import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // Essenziale per i cookie
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        // Reset del form in caso di login riuscito
        setFormData({ email: "", password: "" });
        navigate("/profile");
      } else {
        setMessage(data.message || "Login fallito");
      }
    } catch (err) {
      console.error(err);
      setMessage("Errore di connessione al server");
    }
  };

  return (
    <div className="form-container">
      <div className="form-card">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button className="spaced-button" type="submit">
            Accedi
          </button>
        </form>
        {message && <p className="error-message">{message}</p>}
        <p>
          Non hai un account? <a href="/register">Registrati</a>
        </p>
      </div>
    </div>
  );
};

export default Login;

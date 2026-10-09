import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [error, setError] = useState(null);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const res = await fetch("http://localhost:3000/api/auth/registro", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, email, contrasena }),
      });
      const data = await res.json();
      if (res.ok) {
        alert("Registro exitoso. Ahora puedes iniciar sesión.");
        navigate("/login");
      } else {
        setError(data.msg || data.error || "Error al registrar");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="w3-container w3-content" style={{ maxWidth: 500, marginTop: 100 }}>
      <div className="w3-card-4 w3-round-xlarge w3-white">
        <div className="w3-container w3-theme-d2 w3-round-xlarge w3-padding-16">
          <h2 className="w3-center">Crear cuenta</h2>
        </div>
        <form className="w3-container w3-padding-24" onSubmit={handleRegister}>
          {error && (
            <div className="w3-panel w3-red w3-round w3-padding">
              <p>{error}</p>
            </div>
          )}
          <div className="w3-section">
            <label><i className="fa fa-user"></i> Nombre completo</label>
            <input 
              className="w3-input w3-border w3-round" 
              type="text" 
              placeholder="Ej: Juan Pérez" 
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required 
            />
          </div>
          <div className="w3-section">
            <label><i className="fa fa-envelope"></i> Correo electrónico</label>
            <input 
              className="w3-input w3-border w3-round" 
              type="email" 
              placeholder="tu@email.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>
          <div className="w3-section">
            <label><i className="fa fa-lock"></i> Contraseña</label>
            <input 
              className="w3-input w3-border w3-round" 
              type="password" 
              placeholder="********" 
              value={contrasena}
              onChange={(e) => setContrasena(e.target.value)}
              required 
            />
          </div>
          <div className="w3-section">
            <button type="submit" className="w3-button w3-theme-d2 w3-round w3-block w3-section">
              <i className="fa fa-user-plus"></i> Registrarse
            </button>
          </div>
          <p className="w3-center">¿Ya tienes cuenta? <a href="/login">Inicia sesión aquí</a>.</p>
        </form>
      </div>
    </div>
  );
}

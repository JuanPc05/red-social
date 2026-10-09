import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSocial } from "../components/SocialContext";

export default function LoginPage() {
  const { login } = useSocial();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    const result = await login({ email, contrasena });
    if (result.success) {
      navigate("/");
    } else {
      setError(result.error);
    }
  };

  return (
    <div className="w3-container w3-content" style={{ maxWidth: 500, marginTop: 100 }}>
      <div className="w3-card-4 w3-round-xlarge w3-white">
        <div className="w3-container w3-theme-d2 w3-round-xlarge w3-padding-16">
          <h2 className="w3-center">Iniciar sesión</h2>
        </div>
        <form className="w3-container w3-padding-24" onSubmit={handleLogin}>
          {error && (
            <div className="w3-panel w3-red w3-round w3-padding">
              <p>{error}</p>
            </div>
          )}
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
              <i className="fa fa-sign-in"></i> Acceder
            </button>
          </div>
          <p className="w3-center"><a href="#">¿Olvidaste tu contraseña?</a></p>
          <p className="w3-center">¿No tienes cuenta? <a href="/registro">Regístrate aquí</a>.</p>
        </form>
      </div>
    </div>
  );
}

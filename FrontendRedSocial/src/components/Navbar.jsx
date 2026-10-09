import { useState, useEffect } from "react";
import { useSocial } from "./SocialContext";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const { currentUser, notifications, logout, isDarkMode, toggleDarkMode } = useSocial();
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (searchQuery.trim().length === 0) {
      return;
    }
    const timer = setTimeout(async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/usuarios/buscar?q=${searchQuery}`);
        if (res.ok) {
          const data = await res.json();
          setSearchResults(data);
        }
      } catch (err) {
        console.error(err);
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    if (value.trim().length === 0) {
      setSearchResults([]);
      setSearchQuery('');
    } else {
      setSearchQuery(value);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // Previene errores si el Navbar se renderiza fuera del ProtectedRoute sin sesión activa
  if (!currentUser) return null;

  return (
    <>
      <div className="w3-top">
        <div className="w3-bar w3-theme-d2 w3-left-align w3-large" style={{ display: 'flex', alignItems: 'center' }}>
          <button
            type="button"
            className="w3-bar-item w3-button w3-hide-medium w3-hide-large w3-padding-large w3-hover-white w3-large w3-theme-d2"
            onClick={() => setOpen(!open)}
            aria-label="Menu"
          >
            <i className="fa fa-bars"></i>
          </button>
          <Link to="/" className="w3-bar-item w3-button w3-padding-large w3-theme-d4">
            <i className="fa fa-home w3-margin-right"></i>Logo
          </Link>

          {/* Buscador Integrado */}
          <div className="w3-bar-item w3-hide-small" style={{ position: 'relative', flexGrow: 1, maxWidth: '400px' }}>
            <input
              type="text"
              className="w3-input w3-border w3-round"
              placeholder="Buscar usuarios..."
              value={searchQuery}
              onChange={handleSearchChange}
              style={{ color: '#000', padding: '6px 10px', fontSize: '15px' }}
            />
            {searchResults.length > 0 && (
              <div className="w3-dropdown-content w3-card-4 w3-bar-block w3-show" style={{ position: 'absolute', top: '100%', left: 0, width: '100%', zIndex: 1000 }}>
                {searchResults.map((user) => (
                  <Link to={`/perfil/${user.id}`} key={user.id} className="w3-bar-item w3-button w3-padding" onClick={() => setSearchQuery("")}>
                    <img src={user.avatar || "https://i.pinimg.com/1200x/03/54/a3/0354a313ded0f00c9a621aee6ca87951.jpg"} className="w3-circle w3-margin-right" style={{ width: '30px', height: '30px' }} />
                    <span style={{ color: '#000' }}>{user.nombre}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>
          <div className="w3-dropdown-hover w3-hide-small">
            <button type="button" className="w3-button w3-padding-large" title="Notifications">
              <i className="fa fa-bell"></i>
              <span className="w3-badge w3-right w3-small w3-green">{notifications.length}</span>
            </button>
            <div className="w3-dropdown-content w3-card-4 w3-bar-block" style={{ width: 300 }}>
              {notifications.map((text) => (
                <a key={text} href="#" className="w3-bar-item w3-button">
                  {text}
                </a>
              ))}
            </div>
          </div>
          {/* Botón Desktop: Modo Oscuro */}
          <button onClick={toggleDarkMode} className="w3-bar-item w3-button w3-hide-small w3-right w3-padding-large w3-hover-white" title="Cambiar Tema">
            <i className={`fa ${isDarkMode ? "fa-sun-o" : "fa-moon-o"}`}></i>
          </button>
          
          {/* Botón Desktop: Cerrar sesión */}
          <button onClick={handleLogout} className="w3-bar-item w3-button w3-hide-small w3-right w3-padding-large w3-hover-white" title="Cerrar sesión">
            <i className="fa fa-sign-out"></i>
          </button>
          {/* Botón Desktop: Avatar de la cuenta */}
          <Link to="/perfil" className="w3-bar-item w3-button w3-hide-small w3-right w3-padding-large w3-hover-white" title="My Account">
            <img src={currentUser.avatar} className="w3-circle" style={{ height: 23, width: 23 }} alt="Avatar" />
          </Link>
        </div>
      </div>

      {/* Navbar on small screens */}
      <div className={`w3-bar-block w3-theme-d2 w3-hide-large w3-hide-medium w3-large ${open ? "w3-show" : "w3-hide"}`} style={{ marginTop: 51 }}>
        <Link to="/" className="w3-bar-item w3-button w3-padding-large">News</Link>
        <Link to="/perfil" className="w3-bar-item w3-button w3-padding-large">My Profile</Link>
        {/* Botón Mobile: Tema Oscuro */}
        <button onClick={toggleDarkMode} className="w3-bar-item w3-button w3-padding-large w3-left-align" style={{ width: "100%" }}>Tema {isDarkMode ? 'Claro' : 'Oscuro'}</button>
        {/* Botón Mobile: Cerrar sesión */}
        <button onClick={handleLogout} className="w3-bar-item w3-button w3-padding-large w3-left-align" style={{ width: "100%" }}>Cerrar sesión</button>
      </div>
    </>
  );
}

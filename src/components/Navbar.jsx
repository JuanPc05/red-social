import { useState } from "react";
import { useSocial } from "./SocialContext";

export default function Navbar() {
  const { currentUser, notifications } = useSocial();
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="w3-top">
        <div className="w3-bar w3-theme-d2 w3-left-align w3-large">
          <button
            type="button"
            className="w3-bar-item w3-button w3-hide-medium w3-hide-large w3-right w3-padding-large w3-hover-white w3-large w3-theme-d2"
            onClick={() => setOpen(!open)}
            aria-label="Menu"
          >
            <i className="fa fa-bars"></i>
          </button>
          <a href="#" className="w3-bar-item w3-button w3-padding-large w3-theme-d4">
            <i className="fa fa-home w3-margin-right"></i>Logo
          </a>
          <a href="#" className="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white" title="News">
            <i className="fa fa-globe"></i>
          </a>
          <a href="#" className="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white" title="Account Settings">
            <i className="fa fa-user"></i>
          </a>
          <a href="#" className="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white" title="Messages">
            <i className="fa fa-envelope"></i>
          </a>
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
          <a href="#" className="w3-bar-item w3-button w3-hide-small w3-right w3-padding-large w3-hover-white" title="My Account">
            <img src={currentUser.avatar} className="w3-circle" style={{ height: 23, width: 23 }} alt="Avatar" />
          </a>
        </div>
      </div>

      {/* Navbar on small screens */}
      <div className={`w3-bar-block w3-theme-d2 w3-hide-large w3-hide-medium w3-large ${open ? "w3-show" : "w3-hide"}`} style={{ marginTop: 51 }}>
        <a href="#" className="w3-bar-item w3-button w3-padding-large">Link 1</a>
        <a href="#" className="w3-bar-item w3-button w3-padding-large">Link 2</a>
        <a href="#" className="w3-bar-item w3-button w3-padding-large">Link 3</a>
        <a href="#" className="w3-bar-item w3-button w3-padding-large">My Profile</a>
      </div>
    </>
  );
}

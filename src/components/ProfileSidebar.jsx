import { useState } from "react";
import { useSocial } from "./SocialContext";

function ProfileCard() {
  const { currentUser } = useSocial();
  return (
    <div className="w3-card w3-round w3-white">
      <div className="w3-container">
        <h4 className="w3-center">My Profile</h4>
        <p className="w3-center">
          <img src={currentUser.avatar} className="w3-circle" style={{ height: 106, width: 106 }} alt="Avatar" />
        </p>
        <p className="w3-center"><b>{currentUser.name}</b></p>
        <hr />
        <p><i className="fa fa-pencil fa-fw w3-margin-right w3-text-theme"></i> {currentUser.job}</p>
        <p><i className="fa fa-home fa-fw w3-margin-right w3-text-theme"></i> {currentUser.location}</p>
        <p><i className="fa fa-birthday-cake fa-fw w3-margin-right w3-text-theme"></i> {currentUser.birthday}</p>
      </div>
    </div>
  );
}

function Accordion() {
  const { groups } = useSocial();
  const [openIds, setOpenIds] = useState([]);
  const toggle = (id) =>
    setOpenIds((ids) => (ids.includes(id) ? ids.filter((x) => x !== id) : [...ids, id]));

  return (
    <div className="w3-card w3-round">
      <div className="w3-white">
        {groups.map((group) => {
          const isOpen = openIds.includes(group.id);
          return (
            <div key={group.id}>
              <button
                type="button"
                onClick={() => toggle(group.id)}
                className={`w3-button w3-block w3-theme-l1 w3-left-align ${isOpen ? "w3-theme-d1" : ""}`}
              >
                <i className={`fa ${group.icon} fa-fw w3-margin-right`}></i> {group.title}
              </button>
              {isOpen && (
                <div className="w3-container">
                  {group.photos ? (
                    <div className="w3-row-padding">
                      <br />
                      {group.photos.map((src, i) => (
                        <div key={i} className="w3-half">
                          <img src={src} style={{ width: "100%" }} className="w3-margin-bottom" alt="" />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p>{group.text}</p>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Interests() {
  const { interests } = useSocial();
  return (
    <div className="w3-card w3-round w3-white w3-hide-small">
      <div className="w3-container">
        <p>Interests</p>
        <p>
          {interests.map((tag, i) => (
            <span key={i}>
              <span className={`w3-tag w3-small ${tag.theme}`}>{tag.label}</span>{" "}
            </span>
          ))}
        </p>
      </div>
    </div>
  );
}

function AlertBox() {
  const { showAlert, dismissAlert } = useSocial();
  if (!showAlert) return null;
  return (
    <div className="w3-container w3-display-container w3-round w3-theme-l4 w3-border w3-theme-border w3-margin-bottom w3-hide-small">
      <span onClick={dismissAlert} className="w3-button w3-theme-l3 w3-display-topright">
        <i className="fa fa-remove"></i>
      </span>
      <p><strong>Hey!</strong></p>
      <p>People are looking at your profile. Find out who.</p>
    </div>
  );
}

export default function ProfileSidebar() {
  return (
    <div className="w3-col m3">
      <ProfileCard />
      <br />
      <Accordion />
      <br />
      <Interests />
      <br />
      <AlertBox />
    </div>
  );
}

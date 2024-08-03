import React, { useState } from 'react';
import { Tooltip } from "react-tooltip";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "./common/ThemeContext";
import sun from "./Assets/sun.svg";
import moon from "./Assets/moon.svg";

function Profile({ user }) {
  const { theme, toggleTheme } = useTheme();
  const themeIcon = theme === "light" ? sun : moon;
  const [tooltipText, setTooltipText] = useState("Cliquez pour copier");
  const navigate = useNavigate();
  const handleClick = () => {
    navigator.clipboard.writeText(user.username).then(() => {
      setTooltipText(`Identifiant "${user.username}" copié`);
      setTimeout(() => {
        setTooltipText("Cliquez pour copier le pseudo discord");
      }, 2000);
    });
  };

  const Logout = () => {
    localStorage.removeItem("user");
    navigate("/");
    window.location.reload();
  };

  return (
    <div>
      <header className="flex flex-row justify-evenly space-x-2">
        <p>NaetorUSmash</p>
        <div>
          <Link to="/">Accueil</Link>
        </div>
        {/* Icône de changement de thème */}
        <button onClick={toggleTheme} className="flex items-center">
          <img src={themeIcon} alt="Theme icon" className="size-8" />
        </button>
        <button onClick={Logout}>Se déconnecter</button>
      </header>
      {user && (
        <div className="flex flex-row justify-center content-center w-auto">
          <div className="flex flex-col">
            <div className="flex justify-center">
              <img
                src={`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`}
                alt="Discord Profile"
                className="flex justify-center rounded-full size-72 border-2 border-black"
              />
            </div>
            <div className="text-center space-y-1 mt-2">
              <p>Pseudo : {user.global_name}</p>
              <span
                onClick={handleClick}
                style={{ cursor: "pointer", display: "inline-block" }}
                data-tooltip-id="discordId"
                data-tooltip-content={tooltipText}
              >
                Discord Id : {user.id}
              </span>
              <Tooltip id="discordId" place="bottom" />
              <p>Sessions Organisées : </p>
              <p>Participation en Session : </p>
              <div>
                <p>
                  Les Notes de la communauté seront ajoutées dans le futur !
                </p>
                <div id="Stars">{/* Placeholder pour les notes stars */}</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;
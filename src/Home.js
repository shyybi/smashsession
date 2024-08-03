import React, { useState, useEffect } from 'react';
import { Tooltip } from "react-tooltip";
import { Link, useNavigate } from "react-router-dom";
import sun from "./Assets/sun.svg";
import moon from "./Assets/moon.svg";
import searchico from "./Assets/search-interface-symbol.png";
import { useTheme } from "./common/ThemeContext";
import "./App.css";
import axios from "axios";

function Home({ user, setUser }) {
  const { theme, toggleTheme } = useTheme();
  const themeIcon = theme === "light" ? sun : moon;
  const [distance, setDistance] = useState(50);
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");
    if (code) {
      fetch(`http://localhost:5000/discord/callback?code=${code}`)
        .then((response) => response.json())
        .then((data) => {
          setUser(data);
          localStorage.setItem("user", JSON.stringify(data));
          navigate("/");
        });
    } else {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    }
  }, [navigate, setUser]);

  const handleLogin = async () => {
    const response = await axios.get("http://localhost:5000/discord");
    window.location.href = response.data;
  };

  const handleDistanceChange = (event) => {
    setDistance(event.target.value);
  };

  return (
    <div>
      <header id="App-Header" className="flex flex-row justify-evenly mt-3">
        <p className="text-xl mt-2 ml-8 mr-4">NaetorUSmash</p>
        <div className="flex flex-row w-7/12 bg-gray-300 rounded-xl pl-2">
          <button type="submit" className="size-8 mt-1 pr-3">
            <img src={searchico} alt="search icon" />
          </button>
          <input
            type="text"
            placeholder="Recherche par joueurs / régions"
            className="bg-gray-300 text-black rounded-xl h-10 w-full pl-2"
          />
        </div>
        <button onClick={toggleTheme} className="flex items-center">
          <img src={themeIcon} alt="Theme icon" className="size-8 mt-1 mr-5" />
        </button>
        <div className="flex flex-row">
          {user ? (
            <Link to="/profile">
              <div
                className="flex flex-row-reverse"
                data-tooltip-id="avatar"
                data-tooltip-content="Accedez à votre profil"
              >
                <img
                  src={`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`}
                  alt="Discord Profile"
                  className="rounded-full w-10 h-10"
                />
                <span className="mt-2 mr-2">{user.global_name}</span>
              </div>
            </Link>
          ) : (
            <button
              onClick={handleLogin}
              className="bg-gray-200 px-7 rounded-xl drop-shadow-lg ml-20 transition-all transform hover:bg-gray-300"
            >
              Se Connecter
            </button>
          )}
        </div>
      </header>
      <div className="m-8 w-10/12">
        <div className="flex flex-row">
          <div className="w-1/5">
            <p className="text-lg">Filtres de recherche :</p>
            <br />
            <div className="flex flex-col gap-8">
              <div>
                <p>Jeu</p>
                <select
                  name="jeu"
                  className="bg-gray-200 rounded-lg p-3 w-full transition-all transform hover:bg-gray-300"
                >
                  <option value="ultimate">Smash Ultimate</option>
                  <option value="hdr">Smash HDR</option>
                  <option value="sm4sh">Sm4sh</option>
                  <option value="brawl">Smash Brawl</option>
                  <option value="melee">Smash Melee</option>
                </select>
              </div>
              <div>
                <div className="flex flex-row space-x-1">
                  <p>Distance :</p>
                  <output>{distance} km</output>
                </div>
                <div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={distance}
                    onChange={handleDistanceChange}
                    className="w-full"
                  />
                  <div className="flex flex-row justify-between">
                    <p>0 km</p>
                    <p>100 km</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-row justify-between">
                <p>Afficher les sessions pleines</p>
                <input type="checkbox"></input>
              </div>
              <div>
                <p>Horaire</p>
                <input
                  type="datetime-local"
                  className="bg-gray-200 rounded-lg p-3 w-full transition-all transform hover:bg-gray-300"
                ></input>
              </div>
              <div>
                <p>Niveau</p>
                <select
                  name="niveau"
                  className="bg-gray-200 rounded-lg p-3 w-full transition-all transform hover:bg-gray-300"
                >
                  <option value="debutant">Débutant</option>
                  <option value="intermediaire">Intermédiaire</option>
                  <option value="expert">Expert</option>
                </select>
              </div>
              <div className="flex flex-col text-lg justify-center align-bottom mt-24 h-auto">
                <p>Credits</p>
                <p>Conditions d'utilisation</p>
                <p>Contacts</p>
              </div>
            </div>
          </div>
          {/* Separation */}
          <div className="flex flex-col ml-10 w-10/12">
            <div className="flex flex-col w-full">
              <div className="flex flex-row justify-between w-full">
                <p className="text-lg mr-10">Sessions proches de chez moi</p>
                <button className="bg-gray-200 px-7 rounded-xl drop-shadow-lg transition-all transform hover:bg-gray-300">
                  <Link to="/create">Créer une session</Link>
                </button>
              </div>
              <div className="mt-14 h-screen">
                <p>aa</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Tooltip id="avatar" place="bottom" />
    </div>
  );
}

export default Home;
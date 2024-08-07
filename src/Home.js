import React, { useState, useEffect, useCallback } from "react";
import { Tooltip } from "react-tooltip";
import { Link, useNavigate } from "react-router-dom";
import sun from "./Assets/sun.svg";
import moon from "./Assets/moon.svg";
import google_maps from "./Assets/google_map.svg";
import searchico from "./Assets/search-interface-symbol.png";
import { useTheme } from "./common/ThemeContext";
import "./App.css";
import axios from "axios";
import { attachToken, publicAxios } from "./api/privateAxiosInstance";
import { useQueryClient } from "@tanstack/react-query";
import { usersQueryKeys } from "./api/query-keys/users.query-keys";
import { Loader } from "@mantine/core";

function Home({ user, isLoadingUser }) {
  const { theme, toggleTheme } = useTheme();
  const themeIcon = theme === "light" ? sun : moon;
  const [distance, setDistance] = useState(50);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const hasLocalStorageAccessToken = Boolean(
    localStorage.getItem("accessToken")
  );

  const handleConnection = useCallback(async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");
    if (code) {
      const { data } = await publicAxios.get(
        `http://localhost:5000/discord/callback?code=${code}`
      );
      localStorage.setItem("accessToken", data);
      attachToken(data);
      navigate("/");
    } else {
      if (localStorage.getItem("accessToken")) {
        attachToken(localStorage.getItem("accessToken"));
      }
    }
    queryClient.refetchQueries(usersQueryKeys.me());
  }, [navigate, queryClient]);

  useEffect(() => {
    handleConnection();
  }, [handleConnection]);

  const handleLogin = async () => {
    const response = await axios.get("http://localhost:5000/discord");
    window.location.href = response.data;
  };

  const handleDistanceChange = (event) => {
    setDistance(event.target.value);
  };

  return (
    <div className= {theme === "light" ? "bg-white text-black" : "bg-[#1E1E1E] text-white"}>
      <header id="App-Header" className="flex flex-row justify-evenly">
        <p className={`text-xl mt-7 ml-8 mr-4 ${theme === "light" ? "text-black" : "text-white"}`}>
          NaetorUSmash
        </p>
        <div className={`flex flex-row w-7/12 rounded-xl pl-2 mt-5 ${theme === "light" ? "bg-gray-300 text-black" : "bg-[#848484] text-white"}`}>
          <button type="submit" className="size-8 mt-1 pr-3">
            <img src={searchico} alt="search icon" />
          </button>
          <input
            type="text"
            placeholder="Recherche par joueurs / régions"
            className={`rounded-xl h-10 w-full pl-2  ${theme === "light" ? "bg-gray-300 text-black placeholder-gray-500" : "bg-[#848484] text-white placeholder-white"}`}
          />
        </div>
        <button onClick={toggleTheme} className="flex items-center">
          <img src={themeIcon} alt="Theme icon" className="size-8 mt-6 mr-5" />
        </button>
        <div className="flex flex-row items-center">
          {isLoadingUser && hasLocalStorageAccessToken ? (
            <Loader color="black" size="xs" />
          ) : user ? (
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
              className={`px-7 rounded-xl drop-shadow-lg mt-5 ml-20  h-11 ${theme === "light" ? "bg-gray-200 hover:bg-gray-300" : "bg-[#848484] hover:bg-gray-600"}`}
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
                  className={`rounded-lg p-3 w-full ${theme === "light" ? "bg-gray-200 hover:bg-gray-300" : "bg-[#848484] hover:bg-gray-600"}`}
                >
                  <option value="ultimate">Smash Ultimate</option>
                  <option value="hdr">Smash HDR</option>
                  <option value="sm4sh">Sm4sh</option>
                  <option value="brawl">Smash Brawl</option>
                  <option value="melee">Smash Melee</option>
                </select>
              </div>
              <div>
                <div className={`flex flex-row space-x-1 ${theme === "dark" ? "text-white" : "text-black"}`}>
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
                    className={`w-full ${theme === "light" ? "bg-white accent-blue" : "bg-[#848484] accent-[#848484]"}`}
                  />
                  <div className={`flex flex-row justify-between ${theme === "light" ? "text-black" : "text-white"}`}>
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
                  className={`rounded-lg p-3 w-full ${theme === "light" ? "bg-gray-200 hover:bg-gray-300" : "bg-[#848484] hover:bg-gray-600"}`}
                ></input>
              </div>
              <div>
                <p>Niveau</p>
                <select
                  name="niveau"
                  className={`rounded-lg p-3 w-full  ${theme === "light" ? "bg-gray-200 hover:bg-gray-300" : "bg-[#848484] hover:bg-gray-600"}`}
                >
                  <option value="debutant">Débutant</option>
                  <option value="intermediaire">Intermédiaire</option>
                  <option value="expert">Expert</option>
                </select>
              </div>
              <div className="flex flex-col text-lg justify-center align-bottom mt-20 h-auto">
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
                <button className={`px-7 rounded-xl drop-shadow-lg  ${theme === "light" ? "bg-gray-200 hover:bg-gray-300" : "bg-[#848484] hover:bg-gray-600"}`}>
                  <Link to="/create">Créer une session</Link>
                </button>
              </div>
              <div className="flex ml-20 h-auto w-full flex-row flex-wrap">
                <div className={`rounded-xl mt-14 mr-4 h-56 w-96 drop-shadow-lg ${theme === "light" ? "bg-gray-200 hover:bg-gray-300" : "bg-[#848484] hover:bg-gray-600"}`}>
                  <div className="ml-4">
                    <div className="mt-2">
                      {/*PFP */}
                      <p className="font-bold m-6">Neeroz</p>
                    </div>
                    <div className="mt-3">
                      <div className="flex flex-row mb-1 leading-tight">
                        <p className="font-semibold w-auto whitespace-nowrap mr-2">
                          Date et heure :
                        </p>
                        <p>3 Aout 2024 | 14h à 18h</p>
                      </div>
                      <div className="flex flex-row mb-1 leading-tight">
                        <p className="font-semibold w-auto whitespace-nowrap mr-2">
                          Adresse :
                        </p>
                        <p>2 Rue Paul Vaillant Couturier, 92300 Levallois-Perret</p>
                      </div>
                      <div className="flex flex-row mb-1 leading-tight">
                        <p className="font-semibold w-auto whitespace-nowrap mr-2">
                          Particpants :
                        </p>
                        <p>3/6</p>
                      </div>
                    </div>
                    <div className="flex flex-row mt-3 ml-3">
                      <img className="w-6 h-6" src={google_maps} alt="Google Maps" />
                      <p>Ouvrir dans google map</p>
                      <div className="w-auto mt-1 ml-8">
                        <button className="bg-cyan-200 drop-shadow-lg px-4 py-0.5 rounded-lg hover:bg-cyan-400">
                          S'inscrire
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
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
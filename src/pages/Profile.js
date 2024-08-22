import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../common/ThemeContext";
import sun from "../Assets/sun.svg";
import moon from "../Assets/moon.svg";
import { useQueryClient } from "@tanstack/react-query";
import { usersQueryKeys } from "../api/query-keys/users.query-keys";
import UserInfos from "../components/user/UserInfos";
import { Stack, Tabs } from "@mantine/core";
import MySessionsList from "../components/sessions/MySessionsList";

function Profile({ user }) {
  const { theme, toggleTheme } = useTheme();
  const themeIcon = theme === "light" ? sun : moon;
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const Logout = () => {
    localStorage.removeItem("accessToken");
    queryClient.refetchQueries(usersQueryKeys.me());
    navigate("/");
    window.location.reload();
  };

  return (
    <div>
      <header className="flex flex-row justify-between space-x-2 ">
        <div className="mt-5 flex flex-row w-full">
          <div className="flex flex-row w-full justify-around ">
            <div className="flex">
              <Link to="/" className="text-xl items-center">SmashWith.Me</Link>
            </div>
            <div className="flex items-center">
              <Link to="/" className="text-lg">Accueil</Link>  
            </div>
          </div>
          {/* Icône de changement de thème */}
          <div className="flex w-72"><a></a></div>
          <div className="flex flex-row w-full justify-around">
            <div className="flex items-center">
              <button onClick={toggleTheme} className="flex items-center">
                <img src={themeIcon} alt="Theme icon" className="size-8" />
              </button>
            </div>
            <div className="flex items-center">
              <button onClick={Logout} className="text-lg">Se déconnecter</button>
            </div>
          </div>
        </div>
      </header>




      <Stack>
        <div className="flex justify-center">
          <img
            src={`https://cdn.discordapp.com/avatars/${user?.discordId}/${user?.avatar}.png`}
            alt="Discord Profile"
            className="flex justify-center rounded-full size-56 border-2 border-black"
          />
        </div>
        <Tabs defaultValue="my-sessions">
          
          <Tabs.List justify="center">
            <Tabs.Tab value="details" className={theme === "light" ? "hover:bg-white text-black" : "hover:bg-[#1E1E1E] text-white"}>Informations personnelles</Tabs.Tab>
            <Tabs.Tab value="my-sessions" className={theme === "light" ? "hover:bg-white text-black" : "hover:bg-[#1E1E1E] text-white"} >Sessions créées</Tabs.Tab>
          </Tabs.List>
          
          <Tabs.Panel value="details">
            <UserInfos user={user} />
          </Tabs.Panel>
          <Tabs.Panel value="my-sessions">
            <MySessionsList />
          </Tabs.Panel>
        </Tabs>
      </Stack>
    </div>
  );
}

export default Profile;

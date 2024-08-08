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
            <Tabs.Tab value="details">Informations personnelles</Tabs.Tab>
            <Tabs.Tab value="my-sessions">Sessions créées</Tabs.Tab>
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

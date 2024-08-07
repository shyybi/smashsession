import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Profile from "./Profile";
import Home from "./Home";
import Create from "./Create";
import { useTheme } from "./common/ThemeContext";
import { useMe } from "./api/hooks/users.hooks";

function App() {
  const { theme } = useTheme();
  const { me, isLoading } = useMe();

  useEffect(() => {
    const htmlElement = document.documentElement;
    if (theme === "dark") {
      htmlElement.classList.add("dark");
    } else {
      htmlElement.classList.remove("dark");
    }
  }, [theme]);

  return (
    <Router>
      <div className={`min-h-screen ${theme === "dark" ? "bg-[#1E1E1E] text-white" : "bg-white text-black"}`}>
        <Routes>
          <Route path="*" element={<Home user={me} isLoadingUser={isLoading} />} />
          <Route path="/profile" element={<Profile user={me} />} />
          <Route path="/create" element={<Create user={me} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
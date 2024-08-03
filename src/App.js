import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Profile from "./Profile";
import Home from "./Home";
import Create from "./Create";
import { useTheme } from "./common/ThemeContext";
import { useMe } from "./api/hooks/users.hooks";

function App() {
  const { theme } = useTheme(); // Utilisation correcte du hook useTheme

  const { me, isLoading } = useMe();

  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
    document.body.classList.add("theme-transition");
    const timeout = setTimeout(() => {
      document.body.classList.remove("theme-transition");
    }, 300);

    return () => clearTimeout(timeout);
  }, [theme]);

  return (
    <Router>
      <Routes>
        <Route
          path="*"
          element={<Home user={me} isLoadingUser={isLoading} />}
        />
        <Route path="/profile" element={<Profile user={me} />} />
        <Route path="/create" element={<Create user={me} />} />
      </Routes>
    </Router>
  );
}

export default App;

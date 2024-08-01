import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Profile from './Profile';
import Home from './Home';
import Create from './Create';
import { useTheme } from './common/ThemeContext';

function App() {
  const [user, setUser] = useState(null);
  const { theme } = useTheme(); // Utilisation correcte du hook useTheme

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
    document.body.classList.add('theme-transition');
    const timeout = setTimeout(() => {
      document.body.classList.remove('theme-transition');
    }, 300);

    return () => clearTimeout(timeout);
  }, [theme]);

  return (
    <Router>
      <Routes>
        <Route path="*" element={<Home user={user} setUser={setUser} />} />
        <Route path="/profile" element={<Profile user={user} />} />
        <Route path="/create" element={<Create user={user} />} />
      </Routes>
    </Router>
  );
}

export default App;
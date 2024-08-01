import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Profile from './Profile';
import Home from './Home';
import Create from './Create';
function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="*" element={<Home user={user} setUser={setUser} />} />
        <Route path="/profile" element={<Profile user={user} />} />
        <Route path='/create' element={<Create />} user={user}/>
      </Routes>
    </Router>
  );
}

export default App;
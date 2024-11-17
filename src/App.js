import React, { useState } from 'react';
import Login from './Login';
import Catalogue from './Catalogue';
import './styles/index.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <div className="App">
      {isAuthenticated ? (
        <Catalogue onLogout={() => setIsAuthenticated(false)}/>
      ) : (
        <Login onLogin={() => setIsAuthenticated(true)} />
      )}
    </div>
  );
}

export default App;

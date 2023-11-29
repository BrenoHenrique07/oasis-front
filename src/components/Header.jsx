import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isLoggedIn, setLoggedIn] = useState(true);

  const handleLogin = () => {
    // Lógica de autenticação (pode ser uma chamada à sua API)
    setLoggedIn(true);
  };

  const handleLogout = () => {
    // Lógica de logout
    setLoggedIn(false);
  };

  return (
    <div className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <div>
        <Link to="/pacientes" className="text-xl font-bold">
          <span className="">Oasis</span>
        </Link>
        <Link to="/pacientes" className="p-10">
          <span>Pacientes</span>
        </Link>
      </div>
      <div>
        {isLoggedIn ? (
          <button onClick={handleLogout} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
            Logout
          </button>
        ) : (
          <button onClick={handleLogin} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Login
          </button>
        )}
      </div>
    </div>
  );
};

export default Header;

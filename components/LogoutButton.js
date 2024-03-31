import React from 'react';
import { useAuth } from '../AuthContext'; // Assuming AuthContext is in parent directory

const LogoutButton = () => {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout(); // Call the logout function from AuthContext
  };

  return (
    <button onClick={handleLogout}>Logout</button>
  );
};

export default LogoutButton;


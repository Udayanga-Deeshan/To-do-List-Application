import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import './Navbar.css';

const Navbar = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authToken, setAuthToken] = useState(localStorage.getItem('token') || '');
  const navigate = useNavigate(); // Initialize useNavigate for redirection

  // Set token and store it in localStorage
  const handleSetToken = (token) => {
    setAuthToken(token);
    localStorage.setItem('token', token);
  };

  // Clear token and remove it from localStorage on logout
  const handleLogout = () => {
    setAuthToken('');
    localStorage.removeItem('token');
    navigate('/login'); // Redirect to the login page after logout
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:9000/api/user/login', { email, password });
      handleSetToken(response.data.token); // Save token
      setEmail('');
      setPassword('');
      navigate('/'); // Redirect to the home page after successful login
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  useEffect(() => {
    if (!authToken) {
      navigate('/login'); // If no token, navigate to login page
    }
  }, [authToken, navigate]);

  return (
    <nav>
      <h1>Task Management</h1>
      {authToken ? (
        <button onClick={handleLogout} className='btn-logout'>Logout</button>
      ) : (
        <>
          <button onClick={() => navigate('/login')}>Login</button>
        </>
      )}
    </nav>
  );
};

export default Navbar;

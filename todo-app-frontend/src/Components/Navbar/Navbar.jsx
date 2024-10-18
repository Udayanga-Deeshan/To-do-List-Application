import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import './Navbar.css';

const Navbar = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authToken, setAuthToken] = useState(localStorage.getItem('token') || '');
  const navigate = useNavigate(); 

  
  const handleSetToken = (token) => {
    setAuthToken(token);
    localStorage.setItem('token', token);
  };

  
  const handleLogout = () => {
    setAuthToken('');
    localStorage.removeItem('token');
    navigate('/login'); 
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:9000/api/user/login', { email, password });
      handleSetToken(response.data.token); 
      setEmail('');
      setPassword('');
      navigate('/'); 
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  useEffect(() => {
    if (!authToken) {
      navigate('/login'); 
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

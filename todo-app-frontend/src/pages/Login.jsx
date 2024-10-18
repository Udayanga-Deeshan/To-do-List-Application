import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './CSS/Login.css';

const Login = () => {
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value, 
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post('http://localhost:9000/api/user/login', {
        email: formData.email,
        password: formData.password
      });

      const { token, user } = response.data;
      console.log('User Logged in:', user);
      console.log('JWT Token:', token);

      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      setLoading(false);
      alert('Login successful!');
      
    
      setTimeout(() => {
        navigate('/');
      }, 2000);
      
    } catch (error) {
      setLoading(false);
      setError(error.response?.data?.message || 'An error occurred.');
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleLogin}>
        <div>
          <label>Email:</label>
          <input 
            type="email" 
            name="email" 
            value={formData.email} 
            onChange={handleChange} 
            required 
          />
        </div>
        <div>
          <label>Password:</label>
          <input 
            type="password" 
            name="password"
            value={formData.password} 
            onChange={handleChange} 
            required 
          />
        </div>
        <button type="submit">
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>

      <p className="register-link">
        Don't have an account? <Link to="/register">Sign up here</Link>.
      </p>
    </div>
  );
};

export default Login;

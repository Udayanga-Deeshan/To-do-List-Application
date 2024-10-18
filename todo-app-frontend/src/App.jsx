import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Register  from './pages/Register'
import './CSS/App.css'; 
import Login from './pages/Login';

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<HomePage />} />       
          <Route path="/login" element={<Login />} />  
          <Route path='/register' elemen={<Register/>}/>
         </Routes>
      </div>
    </Router>
  );
};

export default App;

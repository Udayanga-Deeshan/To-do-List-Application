import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Register from './pages/Register';
import Login from './pages/Login';
import TaskForm from './Components/TaskForm/TaskForm';

const App = () => {
  return (
    <div>
      <Routes>
       
        <Route path="/" element={<HomePage />} />
        
        
        <Route path="/login" element={<Login />} />
        
        
        <Route path="/register" element={<Register />} /> 
        
        
        <Route path="/add-task" element={<TaskForm />} />
        
        
        <Route path="/edit-task/:id" element={<TaskForm />} />
      </Routes>
    </div>
  );
};

export default App;

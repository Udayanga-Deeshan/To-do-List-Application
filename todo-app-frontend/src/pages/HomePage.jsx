import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../Components/Navbar/Navbar';  
import TaskList from '../Components/TaskList/TaskList'; 
import AddTask from '../Components/AddTask/AddTask'; 
import './CSS/Home.css';

const HomePage = () => {
  const [tasks, setTasks] = useState([]);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    if (user && token) {
      axios.get(`http://localhost:9000/api/getAllTasks/${user.id}`, {
        headers: {
          Authorization: `Bearer ${token}`, 
        }
      })
      .then((response) => {
        setTasks(response.data);
      })
      .catch((error) => {
        console.error('Error fetching tasks:', error);
      });
    }
  }, [user, token]);



  return (
    <div>
      <Navbar />
      <h1>Welcome, {user.username}</h1>
      <AddTask setTasks={setTasks} /> 
      {tasks.length > 0 ? (
        <TaskList tasks={tasks} setTasks={setTasks} />  
      ) : (
        <p>No tasks available. Click "Add Task" to create one.</p>
      )}
    </div>
  );
};

export default HomePage;

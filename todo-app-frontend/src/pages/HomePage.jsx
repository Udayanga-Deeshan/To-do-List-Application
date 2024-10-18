import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../Components/Navbar/Navbar';
import TaskList from '../Components/TaskList/TaskList';
import './CSS/Home.css';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const [tasks, setTasks] = useState([]);
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('user'))); // Fetch user from localStorage
  const [token, setToken] = useState(() => localStorage.getItem('token')); // Fetch token from localStorage

  useEffect(() => {
    // Fetch tasks if user and token are available
    if (user && token) {
      axios
        .get(`http://localhost:9000/api/getAllTasks/${user.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
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

      {/* Welcome Message */}
      {user ? (
        <h1>Welcome, {user.username}</h1>
      ) : (
        <h1>Welcome, Guest</h1>
      )}

<Link to="/add-task">
        <button className="add-task-btn">Add Task</button>
      </Link>

      {/* Task List or Message if no tasks */}
      {tasks.length > 0 ? (
        <TaskList tasks={tasks} /> 
      ) : (
        <p>No tasks available. Click "Add Task" to create one.</p>
      )}
    </div>
  );
};

export default HomePage;

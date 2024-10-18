import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../Components/Navbar/Navbar';
import TaskList from '../Components/TaskList/TaskList';
import './CSS/Home.css';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const [tasks, setTasks] = useState([]);
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('user'))); 
  const [token, setToken] = useState(() => localStorage.getItem('token')); 

  useEffect(() => {
    
    if (user && token) {
      axios
        .get(`http://localhost:9000/api/tasks/getAllTasks/${user.id}`, {
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

      
      {user ? (
        <h1>Welcome, {user.username}</h1>
      ) : (
        <h1>Welcome, Guest</h1>
      )}

<Link to="/add-task">
        <button className="add-task-btn">Add Task</button>
      </Link>

      
      {tasks.length > 0 ? (
        <TaskList tasks={tasks} token={token} setTasks={setTasks}/> 
      ) : (
        <p>No tasks available. Click "Add Task" to create one.</p>
      )}
    </div>
  );
};

export default HomePage;





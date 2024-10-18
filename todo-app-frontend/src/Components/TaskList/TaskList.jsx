import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom'; 
import axios from 'axios';
import './TaskList.css'; 

const TaskList = () => {
  const { userId } = useParams(); 
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    if (userId) {
      axios.get(`http://localhost:9000/api/tasks/getAllTasks/${userId}`) 
        .then((response) => {
          console.log(response.data);
          setTasks(response.data); 
        })
        .catch((error) => {
          console.error('Error fetching tasks:', error);
        });
    }
  }, [userId]); 

  const toggleCompletion = (id, currentStatus) => {
    const newStatus = currentStatus === 'pending' ? 'completed' : 'pending'; 

    axios.patch(`http://localhost:9000/api/tasks/updateTaskCompletion/${id}`, { status: newStatus })
      .then(() => {
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task.id === id ? { ...task, status: newStatus } : task
          )
        );
      })
      .catch((error) => {
        console.error('Error updating task:', error);
      });
  };

  const deleteTask = (id) => {
    axios.delete(`http://localhost:9000/api/tasks/deleteTask/${id}`)
      .then(() => {
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
      })
      .catch((error) => {
        console.error('Error deleting task:', error);
      });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); 
    const day = String(date.getDate()).padStart(2, '0');
    
    return `${year}-${month}-${day}`;
  };

  return (
    <div className="task-list-container">
      <h1>Task List</h1>
      <Link to="/add-task">
        <button className="add-task-btn">Add Task</button>
      </Link>
      <ul className="task-list">
        {tasks.map((task) => (
          <li key={task.id} className={`task-item ${task.status === 'completed' ? 'completed' : ''}`}>
            <div className="task-details">
              <input
                type="checkbox"
                checked={task.status === 'completed'} 
                onChange={() => toggleCompletion(task.id, task.status)} 
              />
              <Link to={`/task/${task.id}`} className="task-title">
                {task.title}
              </Link>
              <span className="task-due-date"> - Due: {formatDate(task.due_date)}</span>
            </div>
            <div className="task-actions">
              <Link to={`/edit-task/${task.id}`}>
                <button className="edit-btn">Edit</button>
              </Link>
              <button className="delete-btn" onClick={() => deleteTask(task.id)}>
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;

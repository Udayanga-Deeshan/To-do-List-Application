import React from 'react';
import { Link } from 'react-router-dom';
import './TaskList.css'; 
import axios from 'axios';

const TaskList = ({ token,tasks,setTasks, deleteTask }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); 
    const day = String(date.getDate()).padStart(2, '0');
    
    return `${year}-${month}-${day}`;
  };

  const toggleCompletion = (id, currentStatus) => {
    const newStatus = currentStatus === 'pending' ? 'completed' : 'pending';
    console.log(`Updating task ${id} to ${newStatus}`);

    axios
      .patch(
        `http://localhost:9000/api/tasks/updateTaskCompletion/${id}`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task.id === id ? { ...task, status: newStatus } : task
          )
        );
        console.log(`Task ${id} successfully updated to ${newStatus}`);
      })
      .catch((error) => {
        console.error('Error updating task:', error);
      });
  };

  
  

  return (
    <div className="task-list-container">
      <h1>Task List</h1>
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


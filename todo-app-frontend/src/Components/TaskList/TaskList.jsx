
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './TaskList.css'; 

const TaskList = () => {
  
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Finish Project', due_date: '2024-10-20', completed: false },
    { id: 2, title: 'Prepare Presentation', due_date: '2024-10-25', completed: false },
    { id: 3, title: 'Buy Groceries', due_date: '2024-10-22', completed: false },
    { id: 4, title: 'Book Doctor Appointment', due_date: '2024-10-19', completed: false },
  ]);

  
  const toggleCompletion = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  
  const deleteTask = (id) => {
    alert(`Task with ID ${id} deleted`);
  };

  return (
    <div className="task-list-container">
      <h1>Task List</h1>
      <Link to="/add-task">
        <button className="add-task-btn">Add Task</button>
      </Link>
      <ul className="task-list">
        {tasks.map((task) => (
          <li key={task.id} className={`task-item ${task.completed ? 'completed' : ''}`}>
            <div className="task-details">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleCompletion(task.id)}
              />
              <Link to={`/task/${task.id}`} className="task-title">
                {task.title}
              </Link>
              <span className="task-due-date"> - Due: {task.due_date}</span>
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

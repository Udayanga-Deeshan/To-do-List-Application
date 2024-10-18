import React from 'react';
import './TaskDetail.css';

const TaskDetail = ({ task, onEdit, onDelete }) => {
  return (
    <div className="task-detail">
      <h2>{task.title}</h2>
      <p>Description: {task.description}</p>
      <p>Due Date: {new Date(task.due_date).toLocaleDateString()}</p>
      <p>Status: {task.status}</p>
      <button onClick={() => onEdit(task)}>Edit</button>
      <button onClick={() => onDelete(task.id)}>Delete</button>
    </div>
  );
};

export default TaskDetail;

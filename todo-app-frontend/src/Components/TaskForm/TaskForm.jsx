import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './TaskForm.css';

const TaskForm = ({ addTask, updateTask, tasks = [] }) => {
  const { id } = useParams(); 
  const navigate = useNavigate();

  
  const [task, setTask] = useState({ title: '', description: '', due_date: '', status: 'pending' });

  
  useEffect(() => {
    if (id) {
      const existingTask = tasks.find((t) => t.id === parseInt(id));
      if (existingTask) setTask(existingTask);
    }
  }, [id, tasks]);

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (id) {
      
      updateTask({ ...task, id: parseInt(id) }); 
    } else {
      addTask(task);
    }
    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{id ? 'Edit Task' : 'Add Task'}</h2>
      <label>Title</label>
      <input type="text" name="title" value={task.title} onChange={handleChange} required />

      <label>Description</label>
      <textarea name="description" value={task.description} onChange={handleChange} required></textarea>

      <label>Due Date</label>
      <input type="date" name="due_date" value={task.due_date} onChange={handleChange} required />

      <label>Status</label>
      <select name="status" value={task.status} onChange={handleChange}>
        <option value="pending">Pending</option>
        <option value="completed">Completed</option>
      </select>

      <button type="submit">{id ? 'Update Task' : 'Add Task'}</button>
    </form>
  );
};

export default TaskForm;


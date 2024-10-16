import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Snackbar, Alert } from '@mui/material'; 
import './TaskForm.css';

const TaskForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [task, setTask] = useState({
    title: '',
    description: '',
    due_date: '',
    status: 'pending',
  });

  const [openSnackbar, setOpenSnackbar] = useState(false); 
  const [openAlert, setOpenAlert] = useState(false); 
  const [alertMessage, setAlertMessage] = useState(''); 

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:9000/api/tasks/getTask/${id}`)
        .then((response) => {
          const fetchedTask = response.data;
          setTask({
            title: fetchedTask.title,
            description: fetchedTask.description,
            due_date: fetchedTask.due_date,
            status: fetchedTask.status,
          });
        })
        .catch((error) => {
          console.error('Error fetching task:', error);
        });
    }
  }, [id]);

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
    setOpenAlert(false); 
  };

  const handleSubmit = (e) => {
    e.preventDefault(); 

    
    if (!task.title.trim() || !task.description.trim() || !task.due_date) {
      setAlertMessage('Please fill all fields.'); 
      setOpenAlert(true); 
      return; 
    }

    const request = id 
      ? axios.put(`http://localhost:9000/api/tasks/updateTask/${id}`, task)
      : axios.post('http://localhost:9000/api/tasks/createTask', task);

    request
      .then((response) => {
        console.log('Task saved successfully:', response.data);
        setOpenSnackbar(true); 
        setTimeout(() => navigate('/'), 2000); 
      })
      .catch((error) => {
        console.error('Error saving task:', error);
      });
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false); 
  };

  const handleCloseAlert = () => {
    setOpenAlert(false); 
  };

  return (
    <div>
      
      <Snackbar 
        open={openSnackbar} 
        autoHideDuration={6000} 
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }} 
        style={{ marginBottom: '20px' }} 
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          Task {id ? 'updated' : 'added'} successfully!
        </Alert>
      </Snackbar>

      
      <Snackbar
        open={openAlert}
        autoHideDuration={6000}
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }} 
        style={{ marginBottom: '20px' }} 
      >
        <Alert onClose={handleCloseAlert} severity="warning" sx={{ width: '100%' }}>
          {alertMessage}
        </Alert>
      </Snackbar>

      <form onSubmit={handleSubmit}>
        <h2>{id ? 'Edit Task' : 'Add Task'}</h2>

        <label>Title</label>
        <input
          type="text"
          name="title"
          value={task.title}
          onChange={handleChange}
        />

        <label>Description</label>
        <textarea
          name="description"
          value={task.description}
          onChange={handleChange}
        ></textarea>

        <label>Due Date</label>
        <input
          type="date"
          name="due_date"
          value={task.due_date}
          onChange={handleChange}
        />

        <label>Status</label>
        <select name="status" value={task.status} onChange={handleChange}>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>

        <button type="submit">{id ? 'Update Task' : 'Add Task'}</button>
      </form>
    </div>
  );
};

export default TaskForm;









import db from "../config/db.js";

export const getAllTasks = (req, res) => {
    console.log('Received request for all tasks');
    db.query('SELECT * FROM tasks', (err, results) => {
      if (err) {
        return res.status(500).json({ error: 'Failed to fetch tasks.' });
      }
      
      
      if (results.length === 0) {
        return res.status(200).json({ message: 'No tasks yet.' });
      }
  
      
      res.json(results);
    });
  };

  export const getTaskById  = (req,res)=>{
    const taskId = req.params.id;

  const query = 'SELECT * FROM tasks WHERE id = ?'; 

  db.query(query, [taskId], (error, results) => {
    if (error) {
      return res.status(500).json({ message: error.message });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json(results[0]); 
  });
  }

  export const createTask = (req, res) => {
    const { title, description, due_date, status } = req.body;
    db.query('INSERT INTO tasks (title, description, due_date, status) VALUES (?, ?, ?, ?)', 
      [title, description, due_date, status], 
      (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ id: results.insertId, title, description, due_date, status });
    });
  };

  export const updateTask = (req, res) => {
    const { id } = req.params;
    const { title, description, due_date, status } = req.body;
    db.query('UPDATE tasks SET title = ?, description = ?, due_date = ?, status = ? WHERE id = ?', 
      [title, description, due_date, status, id], 
      (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Task updated successfully' });
    });
  };


  export const deleteTask = (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM tasks WHERE id = ?', [id], (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: 'Task deleted successfully' });
    });
  };

  export const updateTaskCompletion = (req,res)=>{
    const { id } = req.params;

  db.query('SELECT status FROM tasks WHERE id = ?', [id], (err, results) => {
    if (err) {
      console.error('Error fetching task:', err);
      return res.status(500).send('Server error');
    }

    if (results.length === 0) {
      return res.status(404).send('Task not found');
    }

    const currentStatus = results[0].status;

    
    let newStatus;
    if (currentStatus === 'pending') {
      newStatus = 'completed'; 
    } else if (currentStatus === 'completed') {
      newStatus = 'pending'; 
    } else {
      
      return res.status(400).send('Invalid status'); 
    }

    
    db.query('UPDATE tasks SET status = ? WHERE id = ?', [newStatus, id], (err) => {
      if (err) {
        console.error('Error updating task:', err);
        return res.status(500).send('Server error');
      }

      res.send(`Task status updated to ${newStatus} successfully`);
    });
  });
  }
  
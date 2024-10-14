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

  export const createTask = (req, res) => {
    const { title, description, dueDate, status } = req.body;
    db.query('INSERT INTO tasks (title, description, due_date, status) VALUES (?, ?, ?, ?)', 
      [title, description, dueDate, status], 
      (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ id: results.insertId, title, description, dueDate, status });
    });
  };

  export const updateTask = (req, res) => {
    const { id } = req.params;
    const { title, description, dueDate, status } = req.body;
    db.query('UPDATE tasks SET title = ?, description = ?, due_date = ?, status = ? WHERE id = ?', 
      [title, description, dueDate, status, id], 
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
  
import db from "../config/db.js";

export const getAllTasks = (req,res)=>{
    db.query('SELECT * FROM tasks', (err, results) => {
        if (err) {
          return res.status(500).json({ error: 'Failed to fetch tasks.' });
        }
        res.json(results);
      });
}
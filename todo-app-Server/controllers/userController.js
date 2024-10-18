import db from "../config/db.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt'


export const registerUser = (req,res)=>{
    const { username, email, password } = req.body;

    
    db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length > 0) return res.status(400).json({ message: 'User already exists.' });

        
        const hashedPassword = await bcrypt.hash(password, 10);

        
        db.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', 
            [username, email, hashedPassword], (err, results) => {
                if (err) return res.status(500).json({ error: err.message });
                res.status(201).json({ message: 'User registered successfully!' });
        });
    });
}


export const loginUser = (req,res)=>{
    const { email, password } = req.body;

    db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) return res.status(400).json({ message: 'Invalid email or password.' });

        const user = results[0];

        
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return res.status(400).json({ message: 'Invalid email or password.' });

        
        const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });

        res.json({ token, user: { id: user.id, username: user.username, email: user.email } });
        console.log('JWT Secret Key:', process.env.JWT_SECRET_KEY);

    });
}
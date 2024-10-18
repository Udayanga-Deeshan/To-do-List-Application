import express from 'express';
const app = express();
const PORT = process.env.PORT;
import cors from 'cors';
import dotenv from 'dotenv';
import taskRoutes  from './routes/taskRoutes.js'
import userRoutes from './routes/userRoutes.js';

dotenv.config();

console.log('JWT Secret Key:', process.env.JWT_SECRET_KEY);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use('/api/tasks',taskRoutes);
app.use('/api/user',userRoutes);




app.listen(PORT,()=>{
    console.log(`Connected to Backend now:Running on port ${PORT}`);
    
})
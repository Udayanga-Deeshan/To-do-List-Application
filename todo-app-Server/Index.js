import express from 'express';
const app = express();
const PORT = process.env.PORT;
import cors from 'cors';
import dotenv from 'dotenv';
import taskRoutes  from './routes/taskRoutes.js'

dotenv.config();


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use('/api/tasks',taskRoutes);




app.listen(PORT,()=>{
    console.log(`Connected to Backend now:Running on port ${PORT}`);
    
})
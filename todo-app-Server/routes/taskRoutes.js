import {Router} from 'express';
import { createTask, deleteTask, getAllTasks, getTaskById, updateTask, updateTaskCompletion } from '../controllers/taskController.js';

const  router =  Router();

router.get('/getAllTasks',getAllTasks);
router.get('/getTask/:id',getTaskById);
router.post('/createTask',createTask);
router.put('/updateTask/:id',updateTask);
router.delete('/deleteTask/:id',deleteTask);
router.patch('/updateTaskCompletion/:id', updateTaskCompletion);






export default router;
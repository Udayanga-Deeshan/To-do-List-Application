import {Router} from 'express';
import { createTask, deleteTask, getAllTasks, getTaskById, updateTask, updateTaskCompletion } from '../controllers/taskController.js';
import { authenticateToken } from '../Middlewares/auth.js';

const  router =  Router();

router.get('/getAllTasks/:userId' ,authenticateToken,getAllTasks);
router.get('/getTask/:id',authenticateToken,getTaskById);
router.post('/createTask',authenticateToken,createTask);
router.put('/updateTask/:id',authenticateToken,updateTask);
router.delete('/deleteTask/:id',authenticateToken,deleteTask);
router.patch('/updateTaskCompletion/:id',authenticateToken, updateTaskCompletion);






export default router;
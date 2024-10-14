import {Router} from 'express';
import { createTask, deleteTask, getAllTasks, updateTask } from '../controllers/taskController.js';

const  router =  Router();

router.get('/getAllTasks',getAllTasks);
router.post('/createTask',createTask);
router.put('/updateTask',updateTask);
router.delete('/deleteTask/:id',deleteTask);





export default router;
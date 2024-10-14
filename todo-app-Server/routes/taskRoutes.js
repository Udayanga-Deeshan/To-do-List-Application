import {Router} from 'express';
import { getAllTasks } from '../controllers/taskController.js';

const  router =  Router();

router.get('/getAllTasks',getAllTasks);




export default router;
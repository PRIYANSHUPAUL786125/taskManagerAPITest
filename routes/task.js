const express=require('express');
const router=express.Router();
const taskController=require('../controllers/tasks');
router.post('/tasks',taskController.createTask);
router.get('/tasks',taskController.getTasks);
router.get('/tasks/:id',taskController.getTask);
router.put('/tasks/:id',taskController.changeTask);
router.delete('/tasks/:id',taskController.deleteTask)
module.exports=router;
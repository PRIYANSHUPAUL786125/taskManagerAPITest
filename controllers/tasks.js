const User=require('../models/auth');
const Task=require('../models/task');
const createTask=async (req,res)=>{
    //console.log(req.user)
    try{const newTask=await Task.create({
        ...req.body,
        user:req.user.id
    });
    res.status(201).json({
        message:'task is succesfully added',
        task :newTask
    })}
    catch(error){
        res.status(500).json({message:'error unable to add task'});
        console.log(error)
    }
}
const getTasks=async (req,res)=>{
    try{const userId=req.user.id;
    const userAndTask=await Task.find({user:userId}).populate('user');
    //console.log(userAndTask);
    res.json({...userAndTask,message:'Tasks retrieved successfully'})}
    catch(error){
        console.log(error);
        res.json({message:'there is an error for fetching tasks'}).status(500)
    }
}
const getTask=async (req,res)=>{
    try{const id=req.params.id;
            const userId = req.user.id; 
    const reqdTask=await Task.findOne({_id:id,user:userId});
     if (!reqdTask) {
      return res.status(404).json({ message: 'Task not found or unauthorized' });
    }
    res.json({
        message:'required task is retrieved sucessfully',
        task:reqdTask
    });}
    catch(error){
        console.log(error);
        res.json({
            message:'unable to retrieve the reqd task'
        })
    }
}
const changeTask=async (req,res)=>{
    try{
        const taskId=req.params.id;
        const userId=req.user.id;
        const reqdTask=await  Task.updateOne(
      { _id: taskId, user: userId },  // find task owned by user
      { $set: req.body }              // update only fields sent in request
    );
        if(reqdTask.matchedCount){
            return res.status(404).json({ message: 'Task not found or unauthorized' });
        }
        res.json({message:'the reqd user is updated sucessfully',
            task:reqdTask
        });
    }
    catch(error){
        console.log(error);
        res.json({message:'failed to edit the task'});
    }
}
const deleteTask=async (req,res)=>{
    try{
        const userId=req.user.id;
        const taskId=req.params.id;
        const deletedTask=await Task.findOneAndDelete({_id:taskId,user:userId});
        if(!deletedTask){
            res.json({message:'task not found or unauthorized'});
        }
        res.json({message:'the task has been sucessfully deleted'});
    }
    catch(error){
        console.log(error);
        res.json({message:'sorry the task is not been deleted'});
    }
}
module.exports={createTask,getTasks,getTask,changeTask,deleteTask};
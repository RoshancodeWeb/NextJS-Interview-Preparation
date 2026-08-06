import Task from "../models/task.model.js"

export const createTask=async(req,res,next)=>{
    try {
        //We always use the way of allowlist instead of mass assignement so that client does not control what data to go in the query
        const {name,role,task,gender,addons}=req.body;
        const newTask=await Task.create({name,role,task,gender,addons});
        res.status(201).json({success:true,data:newTask});
    } catch (error) {
        next(error);
    }

}

export const getAllTask=async(req,res)=>{
    try {
        const allTasks=await Task.find();
        res.status(200).json({success:true,message:"Tasks Loaded Successfully",count:allTasks.length,data:allTasks})
    } catch (error) {
        next(error);
    }
}

export const deleteTask=async(req,res)=>{
    try {
        const {id}=req.params;
        const deletedTask=await Task.findByIdAndDelete(id);
        res.status(200).json({success:true,message:"Task Deleted Successfully",data:deletedTask});
    } catch (error) {
        next(error);
    }
}
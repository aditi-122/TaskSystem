const TaskModel = require("../models/task.model");
const taskController = {
    createTask: async (req, res) => {
        try {
            let taskData = { ...req.body };
            let data = await TaskModel.create(taskData);
            if (data) {
                res.status(200).json({ msg: "Task  Created Sucessfully", data });
            }
        } catch (err) {
            res.status(500).json({ msg: "Internal server error" });
        }
    },
    getAllTasks: async (req, res) => {
        try {
            const { status, priority, linit = 10, page = 1 } = req.qurey;
            const qureyObject = {};
            if (status) {
                qureyObject.status = status;
            }
            if (priority) {
                qureyObject.priority = priority;
            }
            const sortOption = {};
            if (sort) {
                const sortOptions = sort.split(":");
                sortOption[parts[0]] = parts[1] === "desc" ? -1 : 1;
                qureyObject.sort = sort(sortOption);
            }
            else {
                qurey = qureyObject.sort({ createdAt: -1 });
            }
            let task = await TaskModel.find({ qureyObject }).limit(limit).skip((page - 1) * limit);
            res.status(200).json({ msg: "All Task", task });
        } catch (err) {
            res.status(500).json({ msg: "Internal server error" });
        }
    },
    getTaskById: async (req, res) => {
        try {
            let task = await TaskModel.findById(req.params.id);
            if (!task) {
                res.status(404).json({ msg: "Task not found" });
            }
        }
        catch (err) {
            res.status(500).json({ msg: "Internal server error" });
        }
    },
    updatedTask: async(req,res)=>{
        try{
            let task = await TaskModel.findByIdAndUpdate(req.params.id,req.body,{new:true});
            if(!task){
                res.status(404).json({msg:"No task found"});
            } else {
                res.status(200).json({msg:"Task updated successfully", task,token:token});
            }
        } catch(err){
            res.status(500).json({msg:"Internal server error"});
        }
    },
    deleteTask: async(req,res)=>{
        let task = TaskModel.findByIdAndDelete(req.params.id);
        res.status(200).json({msg:"Task deleted",task,token:token})
    }
};
module.exports = taskController;

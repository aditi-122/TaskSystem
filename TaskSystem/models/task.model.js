const mongoose = require('mongoose');
const TaskSchema = new mongoose.Schema({
   title:String,
   description:String,
   status:{type:String,enum:["todo","progress","completed"],default:'todo'},
   priority:{type:String,enum:["low","medium","high"],default:"low"},
   user:{type:mongoose.Schema.Types.ObjectId,ref:'user'}
},
Timestamps ={
    createdAt:true,
    updatedAt:true
});
const TaskModel = mongoose.model('task',TaskSchema);
module.exports = TaskModel;
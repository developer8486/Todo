const mongoose= require("mongoose");

const todoSchema = new mongoose.Schema({
    workTitle :{
        type:String,
        required : true
    },
    workDesc:{
        type: String
    }
});

const Todo = mongoose.model("Todo", todoSchema)
module.exports = Todo;
const express = require ("express");
const app= express();
const methodOverride = require("method-override");
const path=  require("path");
const mongoose = require("mongoose");
const Todo= require("./models/todo.js")

app.set("views", path.join (__dirname,"views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));

main()
    .then(()=>{
        console.log("connection is successfull to DB")
    })
    .catch(err => console.log(err))
async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/Todo')
}

//root route
app.get("/",async(req,res)=>{
    let todos = await Todo.find();
    res.render("index.ejs",{todos});
})

//add task
app.get("/add",(req,res)=>{
    res.render("newTask.ejs");
})

//add new task in DB
app.post("/add",(req,res)=>{
    let{title,desc} = req.body;
    let newTask= new Todo ({
        workTitle:title,
        workDesc:desc
    })
    newTask
    .save()
    .then((res)=>{
        console.log("new task added")
    }).catch((err)=> {
        console.log(err);
    })
    res.redirect("/");
})

//delete task from DB
app.delete("/:id",async(req,res)=>{
    let {id} = req.params;
    await Todo.findByIdAndDelete(id);
    res.redirect("/");
})

//edit route
app.get("/:id/edit", async(req,res)=>{
    let {id} = req.params;
    let task = await Todo.findById(id);
    res.render("edit.ejs",{task});
})

//update the edited task
app.put("/:id",async(req,res)=>{
    let{id} = req.params;
    let {newtitle,newdesc} = req.body;
    console.log(newdesc);
    await Todo.findByIdAndUpdate(
        id,
        {workTitle:newtitle,workDesc:newdesc},
        {runValidators : true , new : true}
    )
    res.redirect("/");
})

app.listen(3000,()=>{
    console.log("listening to port 3000");
})
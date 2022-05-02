const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/user');
const Task = require('./models/task');

const app = express();

app.use(express.json());

const PORT = 5000;

mongoose.connect('mongodb+srv://suraj:suraj@cluster0.gfb4i.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
{ useNewUrlParser: true, useUnifiedTopology: true}, () =>{
    console.log('Connected to database');
});
app.get('/', (req, res) =>{
    res.send('hello world');
})

app.post('/add/user', (req, res) =>{
   const user = {
       name: req.body.name,
       email: req.body.email,
       password: req.body.password
   }

   const newUser = new User(user);
   newUser.save((err, data) => {
       if(err) {
           console.log(err);
       } else {
           res.json(data);
       }
   })
});

app.post('/find/user', async (req, res) => {
    const user = await User.findOne({name: req.body.name});
    res.send({
        status: 'success',
        data: user
    })
})

app.post('/update/user', async (req, res) => {
    const user = await User.updateOne({name: req.body.namee},
    {$set: {namee: req.body.name, email: req.body.email}})
   
    if(user)
    {
        res.send({
            status: 'success',
        })
    }
    })

 app.post('/delete/user', async(req, res) => {
     const user = await Task.deleteOne({name: req.body.name});
     res.send({
         status: 'success',
     })
 })

app.post('/add/task', (req, res) =>{
    const task = {
        title: req.body.title,
        discription: req.body.discription,
        status: req.body.status
    }
 
    const newTask = new Task(task);
    newTask.save((err, data) => {
        if(err) {
            console.log(err);
        } else {
            res.json(data);
        }
    })
 });

 app.post('/find/task', async (req, res) => {
    const task = await Task.findOne({title: req.body.title});
    res.send({
        status: 'success',
        data: task
    })
})

app.post('/update/task', async (req, res) => {
 const task = await Task.updateOne({title: req.body.title},
 {$set: {title: req.body.title, discription: req.body.discription}})

 if(task)
 {
     res.send({
         status: 'success',
     })
 }
 })

 app.post('/delete/task', async(req, res) => {
     const task = await Task.deleteOne({title: req.body.title});
     res.send({
         status: 'success',
     })
 })
  app.post('/add/task', (req, res) => {
     console.log(req.body);
     res.send({
        status: 'success',
     });
 })

 app.get('/add/task', async (req, res) => {
     const task = await Task.find();
     res.send({
         status: 'success',
        data: task
     })
 })

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
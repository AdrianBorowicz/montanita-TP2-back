const express = require("express");
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');

const Category=require('./models/categories');
const DSN = 'mongodb://localhost:27017/montanita';

app.use(async (req, res, next)=>{
    try{
        await mongoose.connect(DSN, {
            serverSelectionTimeoutMS:3000,
        });
        next();

        mongoose.connection.on('error', err=>{

        })
    } catch(err){
        console.log(err);
        res.status(500).end();
    }
})

app.get()


/* app.get('/categories',(req,res)=>{
    Category
    .find()
    .then(data=>{
        res.send(data);
    })
    .catch(err=>{
        console.log(err);
        res.status(404).end();
    })
})
        
app.get('/categories/:id',(req,res)=>{
        Category
        .findById(req.params.id)
        .then(data=>{
            res.send(data);
        })
        .catch((err)=>{
            console.log(err);
            res.status(404).end()});
}) */

app.listen(3000, () => {
    //console.log("El servidor está inicializado en el puerto 3000");
   });

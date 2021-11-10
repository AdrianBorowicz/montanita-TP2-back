const express = require("express");
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
const bcrypt= require('bcrypt');
const cors = require('cors')

app.use(cors())
app.use(bodyParser.json())

const Category=require('./models/categories');
const { truncate } = require("fs");
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

/* app.get('/user', (req,res)=>{
    require('./models/users')
    .find()
    .then(data => {
        res.send(data);
    });
}); */

app.post('/user', (req,res)=>{
    //si encuentra devuelve el username, y sino devuelve null
    require('./models/users')
    .findOne(req.body)
    .then(data => {
        //LO HIC PARA PROBAR SI ME DEVUELVE DATA AUNQUE EL BODY NO SEA IGUAL
        if(data==req.body){
            res.send(data)
        }else{
            res.send(data)
        }
    })
    .catch(err=>{
        console.log(err)
        res.status(404).end();
    })
});

app.get('/products', (req,res)=>{
    require('./models/products')
    .find()
    .then(data=>{
        res.send(data);
    })

});

/*app.get('/user/:username/:password',(req,res)=>{
    require('./models/users')
    .findById(bcrypt.hashing(req.params.password))
    
    
})
*/

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

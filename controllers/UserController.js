const mongoose = require('mongoose');
const User = require('../models/user');
const service = require('../services/index.js');

function signUp(req,res){
    const user = new User({
        username: req.body.username,
    });
    user.save((err)=>{
        if (err){
           res.status(500).send({message: `Error al crear el usuario: ${err}`}) 
        }else{
            return res.status(200).send({token: service.createToken(user)})
        }
    }) 
}

function signIn(req,res){
    User.find({username: req.body.username}, (err, user)=>{
        if (err){
            res.status(500).send({message: err})
        }
        if(!user){
          res.status(404).send({message: 'No existe el usuario.'})  
        }

        req.user = user;
        res.status(200).send({message: 'Se ha logueado correctamente.', token: service.createToken(user)});
    })
}

function login(req,res){
    //si encuentra devuelve el username, y sino devuelve null
    User
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
}


module.exports={
    signUp,
    signIn,
    login //esta la hice previamente, hay que corroborarla.
}

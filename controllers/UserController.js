const mongoose = require('mongoose');
const User = require('../models/users');
const service = require('../services/index.js');


function signUp(req, res) {
    const user = new User({
        username: req.body.username,
        password: req.body.password,
        role: req.body.role
    })

    user.save((err) => {
        if (err) {
            res.status(500).send({ message: `Error al crear el usuario: ${err}` })
        } else {
            res.status(200).send({ token: service.createToken(user) })
        }
    })
}

function signIn(req, res) {
    User.findOne({ username: req.body.username }, (err, user) => {
        if (err) {
            res.status(500).send({ message: err })
        } else if (!user) {
            res.status(404).send({message: `No existe el usuario ${req.body.username}`});
        } else {
            user.comparePassword(req.body.password, (err, isMatch) => {
                if (err) {
                    res.status(404).send({ message: `Error al ingresar: ${err}` })
                } else if(!isMatch) {
                    res.status(404).send({ message: `Error de contraseña: ${req.body.username}` })
                } else{
                    req.user = user;
                    res.status(200).send({ message: 'Se ha logueado correctamente.', token: service.createToken(user) });
                }
            })
        }
    }).select('password');
}


module.exports = {
    signUp,
    signIn,
}

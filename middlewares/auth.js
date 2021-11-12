const { response } = require('express');
const services = require('../services');

function isAuth(req,res,next){
    if (!req.headers.authorization){
        return res.status(403).send({message: 'Usted no tiene acceso'})
    }
    const token=req.headers.authorization.split(" ")[1] //en la posicion 1 del array que devuelve esta el codigo encodeado.

    services.decodeToken(token)
    .then(response=>{
        req.user = response;
        next();
    })
    .catch(response=>{
        res.status(response.status)
    })
}

module.export=isAuth;
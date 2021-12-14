const { response } = require('express');
const services = require('../services');

//decodifica el token.
function isAuth(req,res,next){
    if (!req.headers.authorization){
        res.status(403).send({message: 'Usted no tiene acceso'})
    }else{
        const token=req.headers.authorization.split(" ")[1] //en la posicion 1 del array que devuelve esta el codigo encodeado.
        services.decodeToken(token)
        .then(response=>{
            req.user = response;
            next();
        })
        .catch(err=>{
            console.log(err)
            res.status(500).send(err).end();
        })
    }
}

module.exports=isAuth;
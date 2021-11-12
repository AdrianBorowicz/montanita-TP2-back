const jwt = require('jwt-simple');
const moment = require('moment');
const config = require('../config.js')

function createToken(user){
    const payLoad = {
        sub: user._id,
        creation: moment().unix(),
        expired: moment().add(14, 'days').unix(),
    }
    return jwt.encode(payLoad, config.SECRET_TOKEN)
}

function decodeToken (token){
        const decoded = new Promise((resolve, reject)=>{
            try{
                const payLoad = jwt.decode(token, config.SECRET_TOKEN)
                
                if(payLoad.expired<=moment().unix()){
                    reject({
                       status: 401,
                       message: 'El token ha expirado'
                    })
                }else{
                    resolve(payLoad.sub);
                }
            }catch(err){
                reject({
                    status: 500,
                    message: 'Token invalido'
                })
            }
        })
        return decoded;
}


module.exports={
    createToken,
    decodeToken
}
const mongoose = require('mongoose');
const {Schema} = mongoose;

const Users = new Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    
});
//llamo al metodo model de mongoose y le envio el nombre del modelo + la definicion hecha previamente.
module.exports=mongoose.model('Users', Users);
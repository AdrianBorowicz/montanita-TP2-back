const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require("bcrypt");

const User = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
 //el rol deberia ser una coleccion en la BD, y  que el usuario tenga un rol. Los roles deberian tener permisos, y que estos se puedan agregar y quitar (por el admin).
  role: {
    type: String,
    enum: ['ADMIN', 'USER'],
    required: true,
    default: 'USER',
  }
});


User.pre("save", function (next){
  let user = this;
  if (!user.isModified("password")) {
    next();
  } else {
    bcrypt.genSalt(10, function(err, salt){
      if (err) {
        return next(err);
      } else {
        bcrypt.hash(user.password, salt, function(err, hash){
            if(err){
                next(err);
            }else{
                user.password = hash;
                next();
            }
        });
      }
    });
  }
});


User.methods.comparePassword = function (candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    callback(err, isMatch)
  });
}

//llamo al metodo model de mongoose y le envio el nombre del modelo + la definicion hecha previamente.
module.exports = mongoose.model("User", User);

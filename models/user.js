const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require("bcrypt");

const User = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

User.pre("save", (next) => {
  let user = this;
  if (!user.isModified("password")) {
    return next();
  } else {
    bcrypt.genSalt(10, (err, salt) => {
      if (err) {
        return next();
      } else {
        bcrypt.hash(user.password, salt, null, (err, hash)=>{
            if(err){
                return next(err);
            }else{
                user.password = hash;
                next();
            }
        });
      }
    });
  }
});
//llamo al metodo model de mongoose y le envio el nombre del modelo + la definicion hecha previamente.
module.exports = mongoose.model("User", User);

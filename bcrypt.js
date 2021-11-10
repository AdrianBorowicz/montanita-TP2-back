const bcrypt = require("bcrypt");
const saltRounds = 10;

export default {
  hashing(password) {
    let resultado;
    bcrypt.hash(password, saltRounds, function(err, hash) {
        resultado=hash;
    });
    return resultado;
  },
  unHashing(password, hashid){
    let resultado;
    bcrypt.compare(password, hashid, function(err, result) {
        resultado=result;
    });
    return resultado;
  }
};

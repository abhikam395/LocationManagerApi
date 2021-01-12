const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports.generateHash = function(password){
    return bcrypt.hash(password, saltRounds);
}

module.exports.checkPassword = async function(hashPassword, password){
    return bcrypt.compareSync(password, hashPassword);
}
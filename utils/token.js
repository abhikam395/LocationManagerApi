var jwt = require('jsonwebtoken');

module.exports.getToken = async function(user){
    return jwt.sign({ user: user }, 'shhhhh');
}

module.exports.getUserFromToken = async function(token){
    return jwt.verify(token, 'shhhhh');
}
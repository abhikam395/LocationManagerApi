const { getUserFromToken } = require('./../utils/token');

module.exports.checkToken = async function(req, res, next){
    let { token } = req.headers;

    getUserFromToken(token)
    .then(res => {
        next();
    })
    .catch(err => {
        return res.json({
            status: false,
            error: {
                message: 'Unauthorised user',
                code: 401
            }
        }) 
    })  
}
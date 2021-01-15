/**
 * this function check register fields
 * and return function
 */
module.exports.registerMiddleware = function(){
    return function(req, res, next){
        let { name, email, password } = req.query;
        let errors = [];

        if(name == null || name.length < 3)
            errors.push("Username must be more than 2 characters");
        if(email == null || !email.includes("@gmail.com"))
            errors.push("It doesn't looks like an email");
        if(password == null || password.length < 5)
            errors.push("Username must be more than 5 characters");

        console.log('errors length ' + errors.length)
        if(errors.length > 0){
            res.json({
                status: false,
                error: {
                    message: "Invalid fields",
                    errors: errors
                }
            })  
        }
        else return next();
    }
}

/**
 * this function check login fields
 * and return function
 */
module.exports.loginMiddleware = function(){
    return function(req, res, next){
        console.log("login")
        let { email, password } = req.query;
        let errors = [];

        if(email == null || !email.includes("@gmail.com"))
            errors.push("It doesn't looks like an email");
        if(password == null || password.length < 5)
            errors.push("Username must be more than 5 characters");

        console.log('errors length ' + errors.length)
        if(errors.length > 0){
            res.json({
                status: false,
                error: {
                    message: "Invalid fields",
                    errors: errors
                }
            })  
        }
        else return next();
    }
}
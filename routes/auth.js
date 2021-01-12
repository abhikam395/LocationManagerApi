var express = require('express');
var router = express.Router();
const User = require('./../models').User;

const { checkPassword, generateHash } = require('./../utils/hash-password');
const { getToken } = require('./../utils/token');

//user register api
router.post('/register', async function(req, res){
    let { name, email, password } = req.query;
    let hashPassword = await generateHash(password);
    let user = User.create({
        name: name,
        email: email,
        password: hashPassword
    })
    user.then(async user => {
        let userObj = {
            id: user.id,
            name: user.name,
            email: user.email,
        }
        let token = await getToken(userObj);
        res.json({
            status: true,
            data: {
                token: token,
                user: userObj
            }
        })
    }).catch(err => {
        res.json({
            status: false,
            error: {
                message: err.errors[0].message,
                code: err.parent.code
            }
        })
    })
});


//user login api
router.post('/login', function(req, res, next) {
    let { email, password } = req.query;
    let user = User.findOne({
        where:{
            email: email
        }
    });
    user.then(async user => {
        if(user){
            let userObj = {
                id: user.id,
                name: user.name,
                email: user.email,
            }
            let isCorrectPassword = await checkPassword(user.password, password);
            if(isCorrectPassword){
                let token = await getToken(userObj);
                res.json({
                    status: true,
                    data: {
                        token: token,
                        user: userObj
                    }
                })
            }
            else{
                res.json({
                    status: false,
                    error:{
                        message: 'Check your password'
                    } 
                })
            }
        }
        else{
            res.json({
                status: false,
                error:{
                    message: 'User not registered'
                } 
            })
        }
    }).catch(err => {
        res.json({
            status: false,
            error: err
        })
    })

});

module.exports = router;

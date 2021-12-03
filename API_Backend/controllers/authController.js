const User = require("../models/User");
const jwt = require('jsonwebtoken');

const login = async (req,res,next) =>{
    try{
        let user = await User.findOne({
            username: req.body.username
        });
        let {id, username, isAdmin, Email} = user;
        let isMatch = await user.comparePassword(req.body.password);
        if(isMatch){
            let token = jwt.sign({
                id: id,
                username: username,
                isAdmin: isAdmin,
                Email: Email
            },process.env.SECRET_KEY);
            return res.status(200).send({
                id,
                username,
                isAdmin,
                Email,
                token
            });
        }
        else{
            return next({
                status: 400,
                message: "Invalid username or password"
            })
        }
    }
    catch(err){
        return next({
                status: 400,
                message: "Invalid username or password"
            })
    }
}

const register = async (req,res,next) =>{
    try{
        let user = await User.create(req.body);
        let {id, username, Email} = user;
        let token = jwt.sign({
            id: id,
            username: username,
            Email: Email,
        }, process.env.SECRET_KEY
        );
        return res.status(200).send({
            id,
            username,
            Email,
            token
        });
    }
    catch(err){
        if (err.code === 11000) {
            err.message = "Sorry, that username is taken";
        }
        return next({
            status: 400,
            message: err.message
        });
    }
}

module.exports = {register, login}
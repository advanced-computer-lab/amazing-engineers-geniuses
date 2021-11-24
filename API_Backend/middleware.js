const User = require("./models/User");

const isAdmin =  (req,res,next)=>{
    const currentUser = req.user;
    console.log(currentUser);
    if(!currentUser || !currentUser.isAdmin){
        res.status(403).send({message: 'You are not authorized'});
    }
    else{
        next()
    }
}

module.exports = {isAdmin}
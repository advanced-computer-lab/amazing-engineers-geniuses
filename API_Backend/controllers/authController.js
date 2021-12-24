const User = require("../models/User");
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");

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
        // user.save();
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

const updateInfo = async(req, res, next) => {
    console.log("yooooooo")
    try{
        console.log("yooooooo2")
    let {firstName, lastName, address, countryCode, phoneNumber, email, passportNumber} = req.body;
    console.log("yooooooo3")
    let updatedInfo = await User.findByIdAndUpdate(req.body.userId,{
        FirstName : firstName,
        LastName : lastName,
        Address : address,
        CountryCode : countryCode,
        Email : email, 
        Passport : passportNumber
    });
    if(updatedInfo){
        // let userPhone = updatedInfo.Phone;
        // let newPhone = [...userPhone,newPhone];
        // User.findByIdAndUpdate(req.body.userId,{Phone: newPhone},(err,Phone)=>{
        //     if(err){
        //         console.log(err);
        //         return err;
        //     }
        //     else{
        //         return Phone
        //     }
        // })
        console.log("bobobo found", updatedInfo.FirstName)
        console.log("yooooooo5")
    }
    return res.status(200).send({
        firstName,
        Email
    });
}
        catch(err){
            res.send(err);
        }
}


const changePassword = async (req, res) => {
    const id = req.body.id;
    const password = req.body.password
    const newPassword = req.body.newPassword;
    try {
      let user = await User.findById(id, async (err, user) => {
        if (user) {
            var result = bcrypt.compareSync(password, user.password)
            console.log(result, "pass decrypted");
            // console.log(user, "userrr");
            if (result) {
            //   let hashedPassword = await bcrypt.hash(password, 10);
            //    this.password = hashedPassword;
              user.password = newPassword;
            //   console.log(hashedPassword, "hasssheeeddd ")
              console.log(user.password, "user passwordddd");
              user.save()
              console.log(user)
              return res.json({ message: 'password changed' })
            } else {
              return res.json({ error: 'current password is wrong' })
            }
          }
      }
      ).clone()
      
    } catch (exception) {
      console.log(exception)
      return res.json({
        statusCode: 1,
        error: 'exception',
      })
    }
  }

module.exports = {register, login, updateInfo, changePassword};
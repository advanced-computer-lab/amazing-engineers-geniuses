const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');


router.get('/register', (req,res)=>{
    res.render('register');
})

router.get('/login', (req,res)=>{
    res.render('login');
})

router.post('/register', authController.register);

router.post('/login', authController.login);

router.post('/changePassword', authController.changePassword);

router.post('/updateInfo', authController.updateInfo);

module.exports = router
const {body} = require('express-validator')
const express = require('express')
const router = express.Router();
const User = require('../models/user')

const authController = require('../controllers/auth')

router.put('/signup',[
    body('email')
    .isEmail()
    .withMessage('Please enter a valid email.')
    .custom((value, {req})=> {
        return User.findOne({email: value})
        .then(userDoc => {
            if(userDoc){
                return Promise.reject('Email already exists!')
            }
        }).catch((err)=>{console.log('bug detected:',err)})
    })
    .normalizeEmail(),
    body('password').trim().isLength({min: 5}),
    body('name').trim().not().isEmpty()
], authController.signup)

router.post('/login',authController.login)

module.exports = router;
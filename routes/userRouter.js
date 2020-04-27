var express = require('express');
var User = require('../model/user');
var bodyParser = require('body-parser');
var bcrypt = require('bcrypt');
var userRouter = express.Router();
var passport = require('passport');
userRouter.use(bodyParser.json());

userRouter.post('/register',(req,res,next) =>{
    User.findOne({username: req.body.username})
    .then((user) =>{
        if(user!=null)
        {
            var err = new Error('User already exists');
            res.statusCode = 403;
            res.setHeader('Content-Type','application/json');
            res.json({err: err});
        }
        else{
            const hashedPassword = bcrypt.hash(req.body.password,10);
            var user = new User({
                username: req.body.username,
                password: hashedPassword,
                email: req.body.email,
                number: req.body.number
            });

            user.save()
            .then((user) =>{
                res.statusCode = 200;
                res.setHeader('Content-Type','application/json');
                res.json({status: 'Registration successful'});
            },(err) => next(err))
        }
        
    },(err) =>next(err))
    .catch((err) => next(err));
});

userRouter.post('/login',passport.authenticate('local'),(req,res,next) =>{
    res.statusCode = 200;
    res.setHeader('Content-Type','application/json');
    res.json({status: 'Login successful'});
});

userRouter.get('/logout',(req,res) =>{
    req.session.destroy();
    
});

module.exports = userRouter;

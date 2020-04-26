var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('./model/user');
var bcrypt = require('bcrypt');
exports.local = passport.use(new LocalStrategy((username,password,done) =>{
    User.findOne({username: username})
    .then((user) =>{
        if(user){
            brcypt.compare(password,hash)
            .then((result) =>{
                if(result)
                {
                    return done(null,user);
                }
                else{
                    var err = new Error('Incorrect Password');
                    return done(err,false);
                }
            });


        }
        else{
            var err = new Error('User not found');
            return done(err,false);
        }
    });

    passport.serializeUser((user,done) =>{
           done(null,user);

    });

    passport.deserializeUser((user,done) =>{
        done(null,user);

    });
}));
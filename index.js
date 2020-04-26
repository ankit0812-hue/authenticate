var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var userRouter = require('./routes/userRouter');
var passport = require('passport');
var authenticate = require('./authenticate');
var session = require('express-session');
var FileStore = require('session-file-store')(session);
const url = 'mongodb://localhost:27017/conFusion';
mongoose.connect(url);
app.use(bodyParser.json());
app.use(session({
    name: 'session-id',
    secret: '12345=67890',
    resave: false,
    saveUninitialized: false,
    store: new FileStore()
}));
app.use(passport.initialize());
app.use(passport.session());
app.use('/user',userRouter);
const port = 3000;
app.get('/',(req,res,next) =>{
    res.send('Welcome');
});

app.listen(port);
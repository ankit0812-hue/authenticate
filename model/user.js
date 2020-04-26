var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var userSchema = new Schema({
    username:{
        type: String,
        required: true,
        min: 3,
        max: 255
    },
    password:{
        type: String,
        required: true,
        min: 3
    },
    email:{
        type: String,
        required: true,
        min: 2,
        max: 10
    },
    number:{
        type: Number,
        required: true,
        max: 10
    }
});
var user = mongoose.model('User',userSchema);
module.exports = user;
const mongoose = require('mongoose');

//Schema definition
var UserSchema = new mongoose.Schema({
    googleAuthId: String,
    name: String,
    credits: {
        type: Number,
        default: 0
    }
});

//Method functions

mongoose.model('Users', UserSchema);

const mongoose = require('mongoose');
const _ = require('lodash');

//Schema definition
var UserSchema = new mongoose.Schema({
    personId: String,
    googleAuthId: String
});

//Method functions

UserSchema.methods.toJSON = function () {
    var user = this;
    var userObject = user.toObject();
  
    return _.pick(userObject, ['_id', 'personId', 'googleAuthId']);
};

mongoose.model('Users', UserSchema);

const mongoose = require('mongoose');
const _ = require('lodash');

//Schema definition
var LaunchSchema = new mongoose.Schema({
    name: String, //Launch name
    picture: String, //Launch picture paths
    duration: Number, //Launch duration in days
    startDate: Date, //Launch start time
    emails: {}, //email addresses
    phoneNumbers: {} //phone numbers
});

mongoose.model('Launch', LaunchSchema);
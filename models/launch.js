const mongoose = require('mongoose');
const _ = require('lodash');
var sleep = require('system-sleep');

//Schema definition
var LaunchSchema = new mongoose.Schema({
    name: String, //Launch name
    picture: String, //Launch picture paths
    duration: Number, //Launch duration in days
    startDate: Date, //Launch start time
    emails: [], //email addresses
    phoneNumbers: [], //phone numbers
    emailSubject: String, //Email subjects
    emailBody: String, //Email body
    messageBody: String //SMS Message content
});

LaunchSchema.methods.GetLaunchEmailsAsString = (emails, cb) => {
    if (!emails || emails.length == 0) {
        return '';
    }
    let senders = emails[0];   
    console.log(senders); 
    for(var i = 1; i < emails.length; i++){
        senders += emails[i];
    }
    sleep(1000);
    return senders;
}

var Launch = mongoose.model('Launch', LaunchSchema);

module.exports = {Launch};
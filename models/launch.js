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

LaunchSchema.methods.GetLaunchListAsString = (lst, cb) => {
    if (!lst || lst.length == 0) {
        return '';
    }
    let senders = lst[0];   
    for(var i = 1; i < lst.length; i++){
        senders +=  (';' + lst[i]);
    }
    sleep(100);
    return senders;
}

var Launch = mongoose.model('Launch', LaunchSchema);

module.exports = {Launch};
const mongoose = require('mongoose');
const _ = require('lodash');

//Schema definition
var LaunchSchema = new mongoose.Schema({
    name: String, //Launch name
    picture: String, //Launch picture paths
    duration: Number, //Launch duration in days
    startDate: Date, //Launch start time
    emails: {}, //email addresses
    phoneNumbers: {}, //phone numbers
    emailSubject: String, //Email subjects
    emailBody: String, //Email body
    messageBody: String //SMS Message content
});

LaunchSchema.statics.GetLaunchByName = (name) => {
    return this.model('Launch').findOne({'name': req.params.launchName});
}

var Launch = mongoose.model('Launch', LaunchSchema);

module.exports = {Launch};
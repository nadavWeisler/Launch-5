const mongoose = require('mongoose');
const {Schema} = mongoose;
var sleep = require('system-sleep');

//Schema definition
var LaunchSchema = new mongoose.Schema({
    name: String, //Launch name
    picture: String, //Launch picture paths
    startDate: Date, //Launch start time
    lastResponse: Date,
    gmailCount: {type: Number, default: 0},
    outlookCount: {type: Number, default: 0},
    smsCount: {type: Number, default: 0},
    whatsappCount: {type: Number, default: 0},
    _user: {type: Schema.Types.ObjectId, ref: 'User'},
    desc: String,
    messageBody: String,
    emailSubject: String,
    emailBody: String,
    phones: [],
    emails: [],
    emailsCC: [],
    emailsBCC: []
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
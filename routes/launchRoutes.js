const {mongoose} = require('./../DB/mongoose');
const {Launch} = require('../models/launch');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const CreateMessage = require('../services/createMessage');

function getWhatsAppPhone(phone) {
    return '972' + phone.substring(1);
}

function getProperText(text){
    var returnText = text.replace(' ', '%20');
    returnText = returnText.replace('\n', '%0A');
    return returnText;
}

module.exports = function(app) {
     //Post launch
    app.post('/api/launch', requireLogin, async (req, res) => {
        console.log("post launch - start");
        var launch = new Launch();
        
        launch.name = req.body.name;
        launch.desc = req.body.desc;
        launch.messageBody = req.body.textBody;
        launch.emailSubject = req.body.emailSubject;
        launch.emailBody = req.body.emailBody;
        launch._user = req.user.id;
        launch.startDate = Date.now();

        launch.phones.push(req.body.phoneNumber);
        launch.emails.push(req.body.emailSender);
        
        if(req.body.emailCc){
            launch.emailsCC.push(req.body.emailCc);
        }

        if(req.body.emailBcc){
            launch.emailsBCC.push(req.body.emailBcc);
        }
               
        console.log('finish get data');
        const existingLaunches = await Launch.find({name: launch.name, _user: launch._user});
        if (existingLaunches.length != 0) {
            res.status(409).send('Launch already exist');  
        } else {
            launch.save();
            try {
                const user = await req.user.save();
                res.status(200).send(user);
            }
            catch(err) {
                res.status(402).send(err);
            }
        }
    });

    app.post('/api/editLaunch', requireLogin, async (req, res) => {
        var launch = await Launch.findById(req.body.launchId);
        
        if(!launch){
            res.status(409).send('Launch has not found');
        } else {
            console.log(launch);
            launch.desc = req.body.desc;
            launch.messageBody = req.body.textBody;
            launch.emailSubject = req.body.emailSubject;
            launch.emailBody = req.body.emailBody;
            launch.save();
        }   
    });

    app.get('/api/launch', requireLogin ,async (req, res) => {
        let userLaunches = await Launch.find({_user: req.user.id});       
        res.send(userLaunches).status(200);    
    });

    app.get('/api/updateTexts', requireLogin ,async (req, res) => {
        let launch = await Launch.findById({_user: req.body.id});   
        
        res.send(userLaunches).status(200);    
    });

    app.post('/api/deleteLaunchAndGetOther', async (req, res) => {
        let launch = await Launch.remove({_id: req.body._id});
        console.log("deleted");
        let userLaunches = await Launch.find({_user: req.user.id});       
        res.send(userLaunches).status(200);   
    });

    app.post('/api/whatsAppClick', async (req, res) => {
        console.log("whatsapp click");
        let launch = await Launch.findById(req.body._id);
        launch.whatsappCount = (launch.whatsappCount || 0) + 1;
        var newLaunch = launch.save();
        res.status(200).send(newLaunch);
    });

    app.post('/api/smsClick', async (req, res) => {
        let launch = await Launch.findById(req.body._id);
        launch.smsCount = (launch.smsCount || 0) + 1;
        var newLaunch = launch.save();
        res.status(200).send(newLaunch);
    });

    app.post('/api/outlookClick', async (req, res) => {
        let launch = await Launch.findById(req.body._id);
        launch.outlookCount = (launch.outlookCount || 0) + 1;
        var newLaunch = launch.save();
        res.status(200).send(newLaunch);
    });

    
    app.post('/api/gmailClick', async (req, res) => {
        console.log(req.body);
        let launch = await Launch.findById(req.body._id);
        launch.gmailCount = (launch.gmailCount || 0) + 1;
        var newLaunch = launch.save();
        res.status(200).send(newLaunch);
    });

    app.get('/api/launch/:launchId', async (req, res) => {
        let launch = await Launch.findById(req.params.launchId);
        if(!launch){
            res.status(404).send("Launch does not exist");
        } else {
            res.status(200).send(launch)
        } 
    });
};
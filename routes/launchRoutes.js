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
        launch.smsPath = CreateMessage.CreateSms(req.body.phoneNumber, getProperText(req.body.textBody));
        launch.whatsappPath = CreateMessage.CreateWhatsapp(getWhatsAppPhone(req.body.phoneNumber),
             getProperText(req.body.textBody));
        launch.gmailPath = CreateMessage.CreateGmail(req.body.emailSender, getProperText(req.body.emailSubject),
             getProperText(req.body.emailBody));
        launch.outlookPath = CreateMessage.CreateEmail(req.body.emailSender, (req.body.emailBcc || ''),  (req.body.emailCc || ''),
             getProperText(req.body.emailSubject), getProperText(req.body.emailBody));
        launch._user = req.user.id;
        launch.startDate = Date.now();
        launch.desc = req.body.desc;
        console.log('finish get data');
        const existingLaunches = await Launch.find({name: launch.name, _user: launch._user});
        if (existingLaunches.length != 0) {
            res.status(409).send('Launch already exist');
            
        } else {
            launch.save();
            //req.user.credits = req.user.credits - 1;
            try {
                const user = await req.user.save();
                res.status(200).send(user);
            }
            catch(err) {
                res.status(402).send(err);
            }
        }
    });
    
    app.get('/api/launch', requireLogin ,async (req, res) => {
        console.log("start get /api/launch");
        let userLaunches = await Launch.find({_user: req.user.id});
        for(var i = 0; i < userLaunches.length; i++){
            if((Date.now() - userLaunches[i].startDate.getTime()) >  172800000){
                console.log("all launch delete Launch");
                const removedUser = await Launch.findOneAndRemove({name: userLaunches[i].name, _user: userLaunches[i]._user});
                userLaunches.splice(i, 1);
            }
        }
        
        res.send(userLaunches).status(200);    
    });

    app.post('/api/whatsAppClick', async (req, res) => {
        let launch = await Launch.findById(req.body._id);
        launch.whatsappCount = launch.whatsappCount + 1;
        var newLaunch = launch.save();
        res.status(200).send(newLaunch);
    });

    app.post('/api/smsClick', async (req, res) => {
        let launch = await Launch.findById(req.body._id);
        launch.smsCount = launch.smsCount + 1;
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
        let launch = await Launch.findById(req.body._id);
        launch.gmailCount = launch.gmailCount + 1;
        var newLaunch = launch.save();
        res.status(200).send(newLaunch);
    });

    app.get('/api/launch/:launchId', async (req, res) => {
        console.log("server - getLaunch");
        let launch = await Launch.findById(req.params.launchId);
        if(!launch){
            res.status(404).send("Launch does not exist");
        } else {
            if((Date.now() - launch.startDate.getTime()) >  172800000) {
                const removedLaunch = await Launch.findOneAndRemove({name: launch.name, _user: launch._user});
                res.status(404).send("Launch does not exist");
            }
            else {
                res.status(200).send(launch)
            }
        } 
    });
};
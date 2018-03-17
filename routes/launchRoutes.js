const {mongoose} = require('./../DB/mongoose');
const {Launch} = require('../models/launch');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const CreateMessage = require('../services/createMessage');

module.exports = function(app) {
     //Post launch
    app.post('/api/launch', requireLogin, requireCredits, async (req, res) => {
        var launch = new Launch();
        launch.name = req.body.name;
        launch.smsPath = CreateMessage.CreateSms(req.body.phoneNumber, req.body.textBody);
        launch.whatsappPath = CreateMessage.CreateWhatsapp(req.body.phoneNumber, req.body.textBody);
        launch.gmailPath = CreateMessage.CreateEmail(req.body.emailSender, req.body.emailSubject, req.body.emailBody, 0);
        launch.outlookPath = CreateMessage.CreateEmail(req.body.emailSender, req.body.emailSubject, req.body.emailBody, 1);
        launch._user = req.user.id;
        launch.startDate = Date.now();
        console.log(launch.name, launch._user);
        const existingLaunches = await Launch.find({name: launch.name, _user: launch._user});
        if (existingLaunches.length != 0) {
            res.status(409).send('Launch already exist');
        };
        req.user.credits = req.user.credits - 1;
        try {
            const user = await req.user.save();
            res.status(200).send(user);
        }
        catch(err) {
            res.status(402).send(err);
        }
    });
    
    app.get('/api/launch', requireLogin ,async (req, res) => {
        let userLaunches = await Launch.find({_user: req.user.id});
        
        setTimeout(
        async () => { for(var i = 0; i < userLaunches.length; i++){
            if((Date.now() - userLaunches[i].startDate.getTime()) >  172800000){
                const removedUser = await Launch.findOneAndRemove({name: userLaunches[i].name, _user: userLaunches[i]._user});
            }
        }}
        , userLaunches.length * 150);
        res.send(userLaunches).status(200);       
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
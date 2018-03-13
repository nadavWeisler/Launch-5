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
        const existingLaunches = await Launch.find({name: launch.name, user: launch._user});
        if (existingLaunches.length == 0) {
            launch.save().then((existingLaunches) => {
                res.send(existingLaunches);
            }, (e) => {
                res.status(400).send(e);
            }); 
        }
        else {
            res.send('Launch already exist');
        };

        req.user.credits -= 1;
        try {
            const user = await req.user.save();
            res.send(user);
        }
        catch(err) {
            res.status(422).send(err);
        }
    });
    
    app.get('/api/launch', requireLogin ,async (req, res) => {
        let userLaunches = await Launch.find({_user: req.user.id});
        
        for(var i = 0; i < userLaunches.length; i++){
            if((userLaunches[i].startDate.getTime() - Date.now()) >  172800000){
                const removedUser = await Launch.findOneAndRemove({name: userLaunches[i].name, _user: userLaunches[i]._user});
            }
        }

        console.log(userLaunches);
        res.send(userLaunches).status(200);       
    });
};
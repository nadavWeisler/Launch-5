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
        launch._user = req.user._id;
        launch.startDate = Date.now();
        console.log(req.user);
        const existingLaunches = await Launch.find({"name": launch.name,"_user": launch._user});
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
        }
        catch(err) {
            res.status(422).send(err);
        }
        res.send(user);
    });
    
    app.get('/api/launch', async (res, req) => {
        let currentLaunch = await Launch.findOne({name: req.body.name, _user: req.body._user});
        if(!currentLaunch){
            res.status(404).send("Launch does not exist");
        }

        var timeinmilisec = currentLaunch.startDate.getTime() - Date.now().getTime();
        console.log(timeinmilisec);
        if(timeinmilisec > 172800000){
            const removedUser = await Launch.findOneAndRemove({name: currentLaunch.name, _user: currentLaunch._user});
            res.status(404).send("Launch does not exist");
        }
        res,status(200).send(currentLaunch);       
    });
};
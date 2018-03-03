const {mongoose} = require('./../DB/mongoose');
const {Launch} = require('../models/launch');
const CreateMessage = require('../services/createMessage');

module.exports = function(app) {
    //Get all launches
    app.get('/launches', (req,res)=> {
        Launch.find().then(
            (launch) => {
                res.status(200).send(launch);
            }, (e) => {
                res.status(400).send(e);
            }
        );
    });

    //Get launch by launch name
    app.get('/launch/:launchName', (req,res)=> {
        Launch.findOne({'name': req.params.launchName}).then((launch) =>{
            if(!launch){
                console.log("Launch does not exist");
                return res.status(404).send("Launch does not exist");
            }
            res.status(200).send(launch);
        }).catch((e) => {
            console.log("Error: " + e);
        });
    });

    //Send email from launch by launch name
    app.post('/launch/email/:launchName', (req, res) => {
        Launch.findOne({'name': req.params.launchName}).then((launch) =>{
            if(!launch){
                console.log("Launch does not exist");
                return res.status(404).send("Launch does not exist");
            }
            let senders = launch.GetLaunchListAsString(launch.emails);
            let mailSend = CreateMessage.CreateEmail(senders, launch.emailSubject, launch.emailBody, req.body.mailType);
            if(mailSend){
                res.status(200).send(mailSend);
            } else {
                res.status(404).send("Email problem");
            }
        }).catch((e) => {
            console.log("Error: " + e);
        });
    });

    //Send email from launch by launch name
    app.post('/launch/sms/:launchName', (req, res) => {
        Launch.findOne({'name': req.params.launchName}).then((launch) =>{
            if(!launch){
                console.log("Launch does not exist");
                return res.status(404).send("Launch does not exist");
            }
            let senders = launch.GetLaunchListAsString(launch.phoneNumbers);
            let smsSend = CreateMessage.CreateSms(senders, launch.emailBody);
            if(smsSend){
                res.status(200).send(smsSend);
            } else {
                res.status(404).send("sms problem");
            }
        }).catch((e) => {
            console.log("Error: " + e);
        });
    });

    //Send email from launch by launch name
    app.post('/launch/whatsapp/:launchName', (req, res) => {
        Launch.findOne({'name': req.params.launchName}).then((launch) =>{
            if(!launch){
                console.log("Launch does not exist");
                return res.status(404).send("Launch does not exist");
            }
            let senders = launch.GetLaunchListAsString(launch.phoneNumbers);
            let smsSend = CreateMessage.CreateWhatsapp(senders, launch.emailBody);
            if(smsSend){
                res.status(200).send(smsSend);
            } else {
                res.status(404).send("sms problem");
            }
        }).catch((e) => {
            console.log("Error: " + e);
        });
    });

     //Post launch
    app.post('/launch', (req, res) => {
        console.log(req.body);
        var launch = new Launch(req.body);
        Launch.find({"name": launch.name}).then((existingLaunches) => {
            if (existingLaunches.length == 0) {
                launch.save().then((existingLaunches) => {
                res.send(existingLaunches);
              }, (e) => {
                res.status(400).send(e);
              }); }
            else {
              res.send('Launch already exist');}
            });
    });
};
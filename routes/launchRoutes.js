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
            let mailSend = CreateMessage.CreateEmail(req.body.sender, launch.emailSubject, launch.emailBody,
                req.body.mailType);
            if(mailSend){
                res.status(200).send(mailSend);
            } else {
                res.status(404).send("Email problem");
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
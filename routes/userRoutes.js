const {mongoose} = require('./../DB/mongoose');
const {User} = require('./../models/user')

//Users:
module.exports = function(app) {
    //POST /users
    app.post('/api/users', (req, res) => {
      var user = new User({
        password: req.body.password
      });
      Person.findOne({
        'personId': req.body.personId
        }).then(
          (person) => {
          if(!person){
          res.status(404).send("Person is not exist");
          }
          user.child = person;
          });
    
          user.save().then(
          () => {
          return user.generateAuthToken();
          }).then(
          (token) => {
          res.header('x-auth', token).send(user);
          }).catch(
          (e) => {
          res.status(400).send(e);
          })
      });
  
    //GET /users
    app.get('/api/users', (req, res) => {
        User.find().then(
        (users) => {
        res.send({users});
        }, (e) => {
        res.status(400).send(e);
        });
        });
  
    //GET - users/me
    app.get('/users/me', (req, res) => {
        res.send(req.user);
        });
  
    //POST - /users/login {personId, password}
    app.post('/users/login', (req, res) => {
        var body = _.pick(req.body, ['personId', 'password']);
    
        User.findByCredentials(body.personId, body.password).then(
        (user) => {
        return user.generateAuthToken().then((token) => {
            res.header('x-auth', token).send(user);
        });
        }).catch(
        (e) => {
        res.status(400).send();
        });
        });
  
    //DELETE - /users/me/token
    app.delete('/users/me/token', (req, res) => {
        req.user.removeToken(req.token).then(
        () => {
        res.status(200).send();
        }, () => {
        res.status(400).send();
        });
        });
};
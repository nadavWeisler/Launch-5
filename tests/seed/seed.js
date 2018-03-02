const {ObjectID} = require('mongodb');
const jwt = require('jsonwebtoken');

const {Person} = require('../../models/person');
const {User} = require('../../models/user');

const userOneId = new ObjectID();
const userTwoId = new ObjectID();
const users = [{
  _id: userOneId,
  personId: '316493758',
  password: 'userOnePass',
  tokens: [{
    access: 'auth',
    token: jwt.sign({_id: userOneId, access: 'auth'}, process.env.JWT_SECRET).toString()
  }]
}, {
  _id: userTwoId,
  personId: '857394613',
  password: 'userTwoPass',
  tokens: [{
    access: 'auth',
    token: jwt.sign({_id: userTwoId, access: 'auth'}, process.env.JWT_SECRET).toString()
  }]
}];

const persons = [{
  _id: new ObjectID(),
  personId: '316493758',
  firstName: 'nadav',
  lastName: 'weisler'
}, {
  _id: new ObjectID(),
  personId: '857394613',
  firstName: 'weisler',
  lastName: 'nadav'
}];

const populatePersons = (done) => {
  Person.remove({}).then(() => {
    return Person.insertMany(persons);
  }).then(() => done());
};

const populateUsers = (done) => {
  User.remove({}).then(() => {
    var userOne = new User(users[0]).save();
    var userTwo = new User(users[1]).save();

    return Promise.all([userOne, userTwo])
  }).then(() => done());
};

module.exports = {persons, populatePersons, users, populateUsers};

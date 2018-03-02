const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('../server');
const {Person} = require('../models/person');
const {User} = require('../models/user');
const {persons, populatePersons, users, populateUsers} = require('./seed/seed');



beforeEach(populateUsers);
beforeEach(populatePersons);

console.log(persons);

describe('POST /persons', () => {
  it('should create a new person', (done) => {
    
    var person = [{
      personId: '316493750',
      firstName: 'Shir',
      lastName: 'Agranat'
    }];

    request(app)
      .post('/persons')
      .set('x-auth', users[0].tokens[0].token)
      .send({person})
      .expect(200)
      .expect((res) => {
        expect(res.body.personId).toBe(person.personId);
        expect(res.body.firstName).toBe(person.firstName);
        expect(res.body.lastName).toBe(person.lastName);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Person.find({personId: '316493758'}).then((persons) => {
          expect(persons.length).toBe(1);
          expect(persons[0].text).toBe(person.personId);
          done();
        }).catch((e) => done(e));
      });
  });

  // it('should not create todo with invalid body data', (done) => {
  //   request(app)
  //     .post('/persons')
  //     .set('x-auth', users[0].tokens[0].token)
  //     .send({})
  //     .expect(400)
  //     .end((err, res) => {
  //       if (err) {
  //         console.log(res.body);
  //         return done(err);
  //       }

  //       Person.find().then((persons) => {
  //         expect(persons.length).toBe(2);
  //         done();
  //       }).catch((e) => done(e));
  //     });
  // });
});

describe('GET /persons', () => {
  it('should get all persons', (done) => {
    request(app)
      .get('/persons')
      .set('x-auth', users[0].tokens[0].token)
      .expect(200)
      .expect((res) => {
        expect(res.body.persons.length).toBe(2);
      })
      .end(done);
  });
});

describe('GET /persons/:id', () => {
  it('should return person doc', (done) => {
    request(app)
      .get(`/persons/${persons[0].personId}`)
      .set('x-auth', users[0].tokens[0].token)
      .expect(200)
      .expect((res) => {
        console.log(res.body);
        expect(res.body.person.personId).toBe(persons[0].personId);
      })
      .end(done);
  });

  it('should return 404 if person not found', (done) => {
    var hexId = '111111111';

    request(app)
      .get(`/persons/${hexId}`)
      .set('x-auth', users[0].tokens[0].token)
      .expect(404)
      .end(done);
  });

  it('should return 404 for non-object ids', (done) => {
    request(app)
      .get('/persons/123abc')
      .set('x-auth', users[0].tokens[0].token)
      .expect(404)
      .end(done);
  });
});

describe('DELETE /persons/:id', () => {
  it('should remove a person', (done) => {
    
    var secondPersonId = persons[1].personId;

    request(app)
      .delete(`/persons/${secondPersonId}`)
      .set('x-auth', users[1].tokens[0].token)
      .expect(200)
      .expect((res) => {
        expect(res.body.person.personId).toBe(secondPersonId);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Person.find({'personId': secondPersonId}).then((person) => {
          expect(!person);
          done();
        }).catch((e) => done(e));
      });
  });

  it('should return 404 if person not found', (done) => {
    
    var hexId = '111111111';

    request(app)
      .delete(`/persons/${hexId}`)
      .set('x-auth', users[1].tokens[0].token)
      .expect(404)
      .end(done);
  });

  it('should return 404 if object id is invalid', (done) => {
    request(app)
      .delete('/persons/123abc')
      .set('x-auth', users[1].tokens[0].token)
      .expect(404)
      .end(done);
  });
});

// describe('PATCH /todos/:id', () => {
//   it('should update the todo', (done) => {
//     var hexId = todos[0]._id.toHexString();
//     var text = 'This should be the new text';

//     request(app)
//       .patch(`/todos/${hexId}`)
//       .set('x-auth', users[0].tokens[0].token)
//       .send({
//         completed: true,
//         text
//       })
//       .expect(200)
//       .expect((res) => {
//         expect(res.body.todo.text).toBe(text);
//         expect(res.body.todo.completed).toBe(true);
//         expect(res.body.todo.completedAt).toBeA('number');
//       })
//       .end(done);
//   });

//   it('should not update the todo created by other user', (done) => {
//     var hexId = todos[0]._id.toHexString();
//     var text = 'This should be the new text';

//     request(app)
//       .patch(`/todos/${hexId}`)
//       .set('x-auth', users[1].tokens[0].token)
//       .send({
//         completed: true,
//         text
//       })
//       .expect(404)
//       .end(done);
//   });

//   it('should clear completedAt when todo is not completed', (done) => {
//     var hexId = todos[1]._id.toHexString();
//     var text = 'This should be the new text!!';

//     request(app)
//       .patch(`/todos/${hexId}`)
//       .set('x-auth', users[1].tokens[0].token)
//       .send({
//         completed: false,
//         text
//       })
//       .expect(200)
//       .expect((res) => {
//         expect(res.body.todo.text).toBe(text);
//         expect(res.body.todo.completed).toBe(false);
//         expect(res.body.todo.completedAt).toNotExist();
//       })
//       .end(done);
//   });
// });

// describe('GET /users/me', () => {
//   it('should return user if authenticated', (done) => {
//     request(app)
//       .get('/users/me')
//       .set('x-auth', users[0].tokens[0].token)
//       .expect(200)
//       .expect((res) => {
//         expect(res.body._id).toBe(users[0]._id.toHexString());
//         expect(res.body.email).toBe(users[0].email);
//       })
//       .end(done);
//   });

//   it('should return 401 if not authenticated', (done) => {
//     request(app)
//       .get('/users/me')
//       .expect(401)
//       .expect((res) => {
//         expect(res.body).toEqual({});
//       })
//       .end(done);
//   });
// });

// describe('POST /users', () => {
//   it('should create a user', (done) => {
//     var email = 'example@example.com';
//     var password = '123mnb!';

//     request(app)
//       .post('/users')
//       .send({email, password})
//       .expect(200)
//       .expect((res) => {
//         expect(res.headers['x-auth']).toExist();
//         expect(res.body._id).toExist();
//         expect(res.body.email).toBe(email);
//       })
//       .end((err) => {
//         if (err) {
//           return done(err);
//         }

//         User.findOne({email}).then((user) => {
//           expect(user).toExist();
//           expect(user.password).toNotBe(password);
//           done();
//         }).catch((e) => done(e));
//       });
//   });

//   it('should return validation errors if request invalid', (done) => {
//     request(app)
//       .post('/users')
//       .send({
//         email: 'and',
//         password: '123'
//       })
//       .expect(400)
//       .end(done);
//   });

//   it('should not create user if email in use', (done) => {
//     request(app)
//       .post('/users')
//       .send({
//         email: users[0].email,
//         password: 'Password123!'
//       })
//       .expect(400)
//       .end(done);
//   });
// });

// describe('POST /users/login', () => {
//   it('should login user and return auth token', (done) => {
//     request(app)
//       .post('/users/login')
//       .send({
//         email: users[1].email,
//         password: users[1].password
//       })
//       .expect(200)
//       .expect((res) => {
//         expect(res.headers['x-auth']).toExist();
//       })
//       .end((err, res) => {
//         if (err) {
//           return done(err);
//         }

//         User.findById(users[1]._id).then((user) => {
//           expect(user.tokens[1]).toInclude({
//             access: 'auth',
//             token: res.headers['x-auth']
//           });
//           done();
//         }).catch((e) => done(e));
//       });
//   });

//   it('should reject invalid login', (done) => {
//     request(app)
//       .post('/users/login')
//       .send({
//         email: users[1].email,
//         password: users[1].password + '1'
//       })
//       .expect(400)
//       .expect((res) => {
//         expect(res.headers['x-auth']).toNotExist();
//       })
//       .end((err, res) => {
//         if (err) {
//           return done(err);
//         }

//         User.findById(users[1]._id).then((user) => {
//           expect(user.tokens.length).toBe(1);
//           done();
//         }).catch((e) => done(e));
//       });
//   });
// });

// describe('DELETE /users/me/token', () => {
//   it('should remove auth token on logout', (done) => {
//     request(app)
//       .delete('/users/me/token')
//       .set('x-auth', users[0].tokens[0].token)
//       .expect(200)
//       .end((err, res) => {
//         if (err) {
//           return done(err);
//         }

//         User.findById(users[0]._id).then((user) => {
//           expect(user.tokens.length).toBe(0);
//           done();
//         }).catch((e) => done(e));
//       });
//   });
// });

const mongoose = require('mongoose');
const keys = require('../config/keys');

mongoose.Promise = global.Promise;
console.log(keys.MONGODB_URI);
mongoose.connect(keys.MONGODB_URI);

module.exports = {mongoose};

const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost/codeperfect', {useMongoClient: true});
module.exports = mongoose

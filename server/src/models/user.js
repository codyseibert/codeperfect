const mongoose = require('../mongoose');
const Promise = require('bluebird');
const bcrypt = Promise.promisifyAll(require('bcrypt-nodejs'));
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const UserSchema = new Schema({
  email: {
    type: String,
    lowercase: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role: String
});

UserSchema.pre('save', function(next) {
  const user = this,
        SALT_FACTOR = 8;

  if (!user.isModified('password')) return next();

  bcrypt
    .genSaltAsync(SALT_FACTOR)
    .then(salt => bcrypt.hashAsync(user.password, salt, null))
    .then(hash => {
      user.password = hash;
      next();
    })
    .catch(err => {
      next(err);
    });
});

UserSchema.methods.comparePassword = function(candidatePassword) {
  return bcrypt.compareAsync(candidatePassword, this.password)
}

module.exports = mongoose.model('User', UserSchema);

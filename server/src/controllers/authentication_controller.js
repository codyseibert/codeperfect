const User = require('../models/user')
const ObjectId = require('mongoose').Types.ObjectId
const config = require('../config/main.js')
const ResourceAlreadyExistsError = require('../errors/ResourceAlreadyExistsError');
const ErrorHandler = require('../errors/ErrorHandler');
const InvalidLoginError = require('../errors/InvalidLoginError');
const jwt = require('jsonwebtoken');

function jwtSignUser (user) {
  return jwt.sign(user, config.jwtSecret, {
    expiresIn: 60 * 30 * 24
  });
}

module.exports = {

  async login (req, res) {
    try {
      const {email, password} = req.body;
      const users = await User.find({email: email});
      if (!users.length) throw new InvalidLoginError();
      const user = users[0];
      const isMatch = await user.comparePassword(req.body.password);
      if (!isMatch) throw new InvalidLoginError()
      res
        .status(200)
        .send({
          token: jwtSignUser(user.toObject()),
          user: user
        });
    } catch (err) {
      ErrorHandler(err, res)
    }
  },

  async register (req, res) {
    try {
      const user = await User.findOne({email: req.body.email});
      if (user) throw new ResourceAlreadyExistsError()
      if (req.body.adminPassword === config.adminPassword) req.body.role = 'admin'
      await User.create(req.body);
      res
        .send({
          message: 'successfully register this user, please login'
        });
    } catch (err) {
      ErrorHandler(err, res)
    }
  }
}

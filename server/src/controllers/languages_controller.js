const Language = require('../models/language')
const ObjectId = require('mongoose').Types.ObjectId
const ErrorHandler = require('../errors/ErrorHandler');

module.exports = {
  async index (req, res) {
    try {
      const languages = await Language.find(req.query || {})
      res.status(200).send(languages);
    } catch (err) {
      ErrorHandler(err, res);
    }
  },
  async show (req, res) {
    try {
      const language = await Language.findById(req.params.id)
      res.status(200).send(language);
    } catch (err) {
      ErrorHandler(err, res);
    }
  },
  async post (req, res) {
    try {
      const language = await Language.create(req.body)
      res.status(200).send({
        message: 'successfully created language',
        data: language
      });
    } catch (err) {
      ErrorHandler(err, res);
    }
  }
}

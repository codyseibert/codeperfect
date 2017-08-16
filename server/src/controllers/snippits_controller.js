const Snippit = require('../models/snippit')
const ObjectId = require('mongoose').Types.ObjectId

module.exports = {
  async index (req, res) {
    try {
      const snippits = await Snippit.find(req.query || {})
      res.status(200).send(snippits);
    } catch (err) {
      ErrorHandler(err, res);
    }
  },
  async show (req, res) {
    try {
      const snippit = await Snippit.findById(req.params.id)
      res.status(200).send(snippit);
    } catch (err) {
      ErrorHandler(err, res);
    }
  },
  async post (req, res) {
    try {
      const snippit = await Snippit.create(req.body)
      res.status(200).send({
        message: 'successfully created snippit',
        data: snippit
      });
    } catch (err) {
      ErrorHandler(err, res);
    }
  }
}

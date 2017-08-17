const Report = require('../models/report')
const ObjectId = require('mongoose').Types.ObjectId
const ErrorHandler = require('../errors/ErrorHandler')

module.exports = {
  async index (req, res) {
    try {
      req.query.userId = req.user._id;
      const reports = await Report.find(req.query || {})
      res.status(200).send(reports);
    } catch (err) {
      ErrorHandler(err, res);
    }
  },
  async show (req, res) {
    try {
      req.query.userId = req.user._id;
      const report = await Report.findById(req.params.id)
      res.status(200).send(report);
    } catch (err) {
      ErrorHandler(err, res);
    }
  },
  async post (req, res) {
    try {
      req.body.userId = req.user._id;
      req.body.date = new Date();
      const report = await Report.create(req.body)
      res.status(200).send({
        message: 'successfully created report',
        data: report
      });
    } catch (err) {
      ErrorHandler(err, res);
    }
  }
}

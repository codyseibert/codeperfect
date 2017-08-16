const Report = require('../models/report')
const ObjectId = require('mongoose').Types.ObjectId

module.exports = {
  async index (req, res) {
    try {
      const reports = await Report.find(req.query || {})
      res.status(200).send(reports);
    } catch (err) {
      ErrorHandler(err, res);
    }
  },
  async show (req, res) {
    try {
      const report = await Report.findById(req.params.id)
      res.status(200).send(report);
    } catch (err) {
      ErrorHandler(err, res);
    }
  },
  async post (req, res) {
    try {
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

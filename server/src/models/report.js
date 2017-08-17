const mongoose = require('../mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const ReportSchema = new Schema({
  id: ObjectId,
  userId: ObjectId,
  snippitId: ObjectId,
  accuracy: Number,
  correct: Number,
  cpm: Number,
  errorMap: Object,
  incorrect: Number,
  time: Number,
  total: Number,
  typed: Number,
  date: Date
});

module.exports = mongoose.model('Report', ReportSchema);

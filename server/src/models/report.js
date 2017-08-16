const mongoose = require('../mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const ReportSchema = new Schema({
  id: ObjectId,
  userId: ObjectId,
  snippitId: ObjectId
});

module.exports = mongoose.model('Report', ReportSchema);

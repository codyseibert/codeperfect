const mongoose = require('../mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const SnippitSchema = new Schema({
  id: ObjectId,
  languageId: ObjectId,
  code: String,
  title: String
});

module.exports = mongoose.model('Snippit', SnippitSchema);

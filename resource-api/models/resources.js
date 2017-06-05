var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.Promise = require('bluebird');

var ResourceSchema = new Schema({
  name: String,
  description: String,
  website: String,
  phone: String
});

module.exports = mongoose.model('Resource', ResourceSchema);

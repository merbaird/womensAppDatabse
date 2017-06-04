var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.Promise = require('bluebird');

var GlossarySchema = new Schema({
  term: String,
  definition: String
});

module.exports = mongoose.model('Glossary', GlossarySchema);

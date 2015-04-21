'use strict';

var mongoose = require('mongoose');
var random = require('mongoose-random');
var Schema = mongoose.Schema;

var schemasObj = {};

var PromptSchema = new Schema({
  card_id: Number, // jshint ignore:line
  card: String
});

PromptSchema.plugin(random, { path: 'r' });

schemasObj.whitecards = mongoose.model('whitecard', PromptSchema);

for (var key in schemasObj) {
  schemasObj[key].syncRandom(function (err) { // result
    if(err) {console.log('schema err', err);}
    console.log('random sync of prompt schema complete');
  }); // jshint ignore:line
}

module.exports = {
  whitecards: schemasObj.whitecards,
};

'use strict';

var mongoose = require('mongoose');
var random = require('mongoose-random');
var Schema = mongoose.Schema;

var schemasObj = {};

var MemeSchema = new Schema({
  generatorID: Number,
  displayName: String,
  urlName: String,
  totalVotesScore: Number,
  imageUrl: String,
  instancesCount: Number,
  ranking: Number,
  context: String
});

var CuratedMemeSchema = new Schema({
  gen_id: Number, // jshint ignore:line
  displayName: String,
  imageUrl: String,
  context: String
});

MemeSchema.plugin(random, { path: 'r' });
CuratedMemeSchema.plugin(random, { path: 'r' });

schemasObj.memes = mongoose.model('Meme', MemeSchema);
schemasObj.curatedmemes = mongoose.model('curatedMeme', CuratedMemeSchema);

for (var key in schemasObj) {
  schemasObj[key].syncRandom(function (err) { // result
    if(err) {console.log('schema err', err);}
    console.log('random sync of schema complete');
  }); // jshint ignore:line
}

module.exports = {
  memes: schemasObj.memes,
  curatedmemes: schemasObj.curatedmemes
};



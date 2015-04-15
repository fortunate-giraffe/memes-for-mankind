'use strict';

var mongoose = require('mongoose');
var random = require('mongoose-random');
var Schema = mongoose.Schema;

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

MemeSchema.plugin(random, { path: 'r' });

module.exports = mongoose.model('Meme', MemeSchema);



'use strict';

var assert = require('assert'); // jshint ignore:line
var memeController = require('../../server/memes/memeController.js');

describe('memeController', function(){

    it('should have a getMemes method', function(){
      expect(memeController.hasOwnProperty('getMemes')).toEqual(true);
    });

    it('should have a createMeme method', function(){
      expect(memeController.hasOwnProperty('createMeme')).toEqual(true);
    });
});

'use strict';

var assert = require('assert');
var api = require('../../server/utils/apiCalls.js');

describe('memegenerator.net API calls', function(){

    it('should have a getNewMemeGenerators method', function(){
      expect(api.hasOwnProperty('getNewMemeGenerators')).toEqual(true);
    });

    it('should have a getContextForMemes method', function(){
      expect(api.hasOwnProperty('getContextForMemes')).toEqual(true);
    });
});

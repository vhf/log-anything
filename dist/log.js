'use strict';

var util = require('util');

function log() {
  var _console;

  var result = [];

  for (var _len = arguments.length, obj = Array(_len), _key = 0; _key < _len; _key++) {
    obj[_key] = arguments[_key];
  }

  for (var i = 0; i < obj.length; i++) {
    if (typeof obj[i] === 'string') {
      result.push(obj[i]);
    } else {
      result.push(util.inspect(obj[i], false, null));
    }
  }
  (_console = console).log.apply(_console, result);
}

module.exports = log;
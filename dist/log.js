'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var util = require('util');

var Log = (function () {
  function Log() {
    _classCallCheck(this, Log);
  }

  _createClass(Log, null, [{
    key: '_isNumeric',
    value: function _isNumeric(n) {
      return !isNaN(parseFloat(n)) && isFinite(n) ? String(n).indexOf('.') : false;
    }
  }, {
    key: 'log',
    value: function log() {
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
  }, {
    key: 'logt',
    value: function logt(table) {
      var matrix = [];
      for (var i = 0; i < table.length; i++) {
        for (var j = 0; j < table[i].length; j++) {
          var value = String(table[i][j]);
          var numeric = Log._isNumeric(value);
          var tObj = {
            value: value,
            length: String(table[i][j]).length,
            column: j
          };
          if (numeric !== false) {
            tObj.numerical = true;
          }
          if (numeric !== -1) {
            tObj.point = numeric;
            tObj.after = value.slice(numeric + 1).length;
          }

          table[i][j] = tObj;

          if (!matrix[j]) {
            matrix[j] = { length: tObj.length };
          } else {
            if (tObj.length > matrix[j].length) {
              matrix[j].length = tObj.length;
            }
          }

          if (tObj.point) {
            matrix[j].point = tObj.point > (matrix[j].point || 0) ? tObj.point : matrix[j].point;
          }
          if (!matrix[j].point && !matrix[j].numerical && tObj.numerical) {
            matrix[j].numerical = tObj.numerical;
          }
        }
      }

      for (var i = 0; i < table.length; i++) {
        for (var j = 0; j < table[i].length; j++) {
          var column = matrix[j];
          var cPoint = column.point;
          var cLength = column.length;
          var value = table[i][j];
          var padding = undefined;
          var before = undefined;
          var after = undefined;
          if (!!value.point) {
            before = cPoint - value.point;
            after = cLength - cPoint - value.after;
          } else if (value.numerical) {
            before = (cPoint || cLength) - value.length;
            after = cLength - (cPoint || cLength) + 1;
          } else {
            before = 0;
            after = cLength - value.length + 1;
          }
          padding = ' '.repeat(before);
          padding += value.value;
          padding += ' '.repeat(after);
          table[i][j] = padding;
        }
        Log.log.apply(Log, _toConsumableArray(table[i]));
      }
    }
  }]);

  return Log;
})();

module.exports = Log;
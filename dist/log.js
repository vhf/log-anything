'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var util = require('util');

var Log = function () {
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
      if (table.length && table[0].length) {
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
              if (numeric !== -1) {
                tObj.point = numeric;
                tObj.after = value.slice(numeric + 1).length;
              }
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
      } else {
        if (table.length && _typeof(table[0]) === 'object') {
          var _ret = function () {
            var keys = table.reduce(function (k, o) {
              var thisKeys = Object.keys(o);
              thisKeys.forEach(function (thisKey) {
                if (k.indexOf(thisKey) === -1) {
                  k.push(thisKey);
                }
              });
              return k;
            }, []);
            var pad = ' '.repeat(('' + table.length).length + 1);
            matrix.push([pad + '#'].concat(_toConsumableArray(keys)));

            var _loop = function _loop(_i) {
              var tmp = matrix[0].map(function () {
                return '';
              });
              tmp[0] = _i;
              Object.entries(table[_i]).map(function (_ref) {
                var _ref2 = _slicedToArray(_ref, 2),
                    key = _ref2[0],
                    val = _ref2[1];

                tmp[keys.indexOf(key) + 1] = val;
              });
              matrix.push(tmp);
            };

            for (var _i = 0; _i < table.length; _i++) {
              _loop(_i);
            }
            Log.logt(matrix);
            return {
              v: void 0
            };
          }();

          if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
        }
      }

      for (var _i2 = 0; _i2 < table.length; _i2++) {
        for (var _j = 0; _j < table[_i2].length; _j++) {
          var column = matrix[_j];
          var cPoint = column.point;
          var cLength = column.length;
          var _value = table[_i2][_j];
          var padding = void 0;
          var before = void 0;
          var after = void 0;
          if (!!_value.point) {
            before = cPoint - _value.point;
            after = cLength - cPoint - _value.after;
          } else if (_value.numerical) {
            before = (cPoint || cLength) - _value.length;
            after = cLength - (cPoint || cLength) + 1;
          } else {
            before = 0;
            after = cLength - _value.length + 1;
          }
          padding = ' '.repeat(before);
          padding += _value.value;
          padding += ' '.repeat(after);
          table[_i2][_j] = padding;
        }
        Log.log.apply(Log, _toConsumableArray(table[_i2]));
      }
    }
  }]);

  return Log;
}();

module.exports = Log;
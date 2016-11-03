const util = require('util');

class Log {
  static _isNumeric(n) {
    return (!isNaN(parseFloat(n)) && isFinite(n)) ?
      String(n).indexOf('.') : false;
  }

  static log(...obj) {
    const result = [];
    for (let i = 0; i < obj.length; i++) {
      if (typeof obj[i] === 'string') {
        result.push(obj[i]);
      } else {
        result.push(util.inspect(obj[i], false, null));
      }
    }
    console.log(...result);
  }

  static logt(table) {
    const matrix = [];
    if (table.length && table[0].length) {
      for (let i = 0; i < table.length; i++) {
        for (let j = 0; j < table[i].length; j++) {
          const value = String(table[i][j]);
          const numeric = Log._isNumeric(value);
          const tObj = {
            value,
            length: String(table[i][j]).length,
            column: j,
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
      if (table.length && typeof table[0] === 'object') {
        const keys = table.reduce((k, o) => {
          const thisKeys = Object.keys(o);
          thisKeys.forEach(thisKey => {
            if (k.indexOf(thisKey) === -1) {
              k.push(thisKey);
            }
          });
          return k;
        }, []);
        const pad = ' '.repeat(('' + table.length).length + 1);
        matrix.push([`${pad}#`, ...keys]);
        for (let i = 0; i < table.length; i++) {
          const tmp = matrix[0].map(() => '');
          tmp[0] = i;
          Object.entries(table[i]).map(([key, val]) => {
            tmp[keys.indexOf(key) + 1] = val;
          });
          matrix.push(tmp);
        }
        Log.logt(matrix);
        return;
      }
    }

    for (let i = 0; i < table.length; i++) {
      for (let j = 0; j < table[i].length; j++) {
        const column = matrix[j];
        const cPoint = column.point;
        const cLength = column.length;
        const value = table[i][j];
        let padding;
        let before;
        let after;
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
      Log.log(...table[i]);
    }
  }
}

module.exports = Log;

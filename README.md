# log-anything

`log-anything` is a dead simple JS debug/logging utility

# Usage

```shell
npm install log-anything
```

Then require it.

```javascript
const l = require('log-anything');

const obj = { a: 1, b: 2, c: 3 };
// log displays values
l.log('obj is', obj, 'and this is an array:', [3, 2, 1]);
// obj is { a: 1, b: 2, c: 3 } and this is an array: [ 3, 2, 1 ]

var xs = [
  ['ops/sec', 'name', '(comment)'],
  [520.56, 'algo 1'],
  ['9.99', 'two', 'strange'],
  [10, 'third one'],
  ['nine thousand', 'NaN', 'fun!'],
];
// logt displays a table
l.logt(xs);
/*
ops/sec        name       (comment)
520.56         algo 1
  9.99         two        strange
 10            third one
nine thousand  NaN        fun!
*/
```

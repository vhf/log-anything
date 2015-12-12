# log-anything

`log-anything` is a dead simple JS debug/logging utility

# Usage

```shell
npm install log-anything
```

Then require it.

```javascript
var log = require('log-anything');
var obj = { a: 1, b: 2, c: 3 };
log('obj is', obj, 'and this is an array:', [3, 2, 1]);
```

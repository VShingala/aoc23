const fs = require('fs'),
  graphlib = require("graphlib"),
  _ = require('lodash');

function readInput () {
  var str = fs.readFileSync('input.txt', 'utf-8'),
    input = [],
    start = [];
  
  _.forEach(str.split('\n'), (ele, indx) => {
    input.push(_.map(ele.split(''), (ele2, indy) => {
      return ele2;
    }));
  });

  return input;
}

let input = readInput(),
  g = {},
  data = input,
  done = {},
  mat = [],
  curi = 0,
  curj = 0,
  exr = [],
  exc = [],
  expr = [],
  expc = [],
  isexc,
  allg = [],
  res = 0;

isexc = _.fill(Array(data[0].length), false);

for (i = 0; i < data.length; i++) {

  if (data[i].indexOf('#') === -1) {
    exr.push(i);
  }

  for (j = 0; j < data[i].length; j++) {
    if (data[i][j] === '#') {
      isexc[j] = true;
    }
  }

  if (i === data.length - 1) {
    for (j = 0; j < isexc.length; j++) {
      if (isexc[j] === false) {
        exc.push(j);
      }
    }
  }
}

for (i = 0; i < data.length; i++) {
  expr.push(data[i]);
  if (exr.indexOf(i) !== -1) {
    expr.push(_.fill(Array(data[0].length), '.'));
  }
}

for (i = 0; i < expr.length; i++) {
  expc.push([]);
}

for (i = 0; i < expr.length; i++) {
  for (j = 0; j < expr[i].length; j++) {
    expc[i].push(expr[i][j]);
    if (exc.indexOf(j) !== -1) {
      expc[i].push('.');
    }
  }
}

for (i = 0; i < expc.length; i++) {
  for (j = 0; j < expc[i].length; j++) {
    if (expc[i][j] === '#') {
      allg.push([i, j]);
    }
  }

  // var str = expc[i].join('');
  // console.log(str);
}

for (i = 0; i < allg.length; i++) {
  for (j = i + 1; j < allg.length; j++) {
    let xd = (allg[i][0] - allg[j][0]),
      yd = (allg[i][1] - allg[j][1]);

    xd < 0 ? xd = xd * -1 : xd = xd;
    yd < 0 ? yd = yd * -1 : yd = yd;

    res += (xd + yd);
  }
}

console.log(res);

// Day 11 Part 2 solution can solve this easily without array manipulation with expf = 2;

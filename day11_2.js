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
  distr = {},
  distc = {},
  isexc,
  allg = [],
  res = 0;

const expf = 1000000;

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

for (i = 1; i < data.length; i++) {
  if (exr.indexOf(i) === -1) {
    distr[i + ',' + (i - 1)] = 1;
  }
  else {
    distr[i + ',' + (i - 1)] = expf;
  }
}

for (i = 1; i < data[0].length; i++) {
  if (exc.indexOf(i) === -1) {
    distc[i + ',' + (i - 1)] = 1;
  }
  else {
    distc[i + ',' + (i - 1)] = expf;
  }
}

for (i = 0; i < data.length; i++) {
  for (j = 0; j < data[i].length; j++) {
    if (data[i][j] === '#') {
      allg.push([i, j]);
    }
  }

  // var str = expc[i].join('');
  // console.log(str);
}

for (i = 0; i < allg.length; i++) {
  for (j = i + 1; j < allg.length; j++) {
    let x1 = _.min([allg[i][0], allg[j][0]]),
      x2 = _.max([allg[i][0], allg[j][0]]),
      y1 = _.min([allg[i][1], allg[j][1]]),
      y2 = _.max([allg[i][1], allg[j][1]]),
      cd = 0;
    
    for (k = x1 + 1; k <= x2; k++) {
      cd += distr[k + ',' + (k - 1)];
    }

    for (k = y1 + 1; k <= y2; k++) {
      cd += distc[k + ',' + (k - 1)];
    }

    // console.log('Dist between ', allg[i], allg[j], ' is ', cd);

    res += cd;
  }
}

console.log(res);
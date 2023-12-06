const fs = require('fs'),
  _ = require('lodash');

function readInput () {
  var str = fs.readFileSync('input.txt', 'utf-8'),
    time = str.split('\n')[0],
    dist = str.split('\n')[1],
    td = [],
    dd = [],
    ftd = '',
    fdd = '';

  _.forEach(time.split(' '), (ele) => {
    if (!isNaN(ele) && ele.length > 0) {
      ftd += ele;
    }
  });

  _.forEach(dist.split(' '), (ele) => {
    if (!isNaN(ele) && ele.length > 0) {
      fdd += ele;
    }
  });

  return {
    time: [ftd],
    dist: [fdd]
  };
}

let input = readInput(),
  time = input.time,
  dist = input.dist,
  res = 1;

for (let i = 0; i < time.length; i++) {
  let ways = 0;

  for (let j = 0; j <= (time[i] / 2); j++) {
    // console.log(j, (j * (time[i] - j)), (dist[i] <= (j * (time[i] - j))));
    if (dist[i] < (j * (time[i] - j))) {
      if (time[i] % 2 === 0) {
        ways = ((parseInt((time[i] / 2)) - j) * 2) + 1;
      }
      else {
        ways = ((parseInt((time[i] / 2)) + 1 - j) * 2);
      }
      break;
    }
  }

  console.log(ways);

  res *= ways;
}

console.log(res);
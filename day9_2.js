const fs = require('fs'),
  _ = require('lodash');

function readInput () {
  var str = fs.readFileSync('input.txt', 'utf-8'),
    input = [];
  
  _.forEach(str.split('\n'), (ele) => {
    input.push(_.map(ele.split(' '), (ele) => {
      return parseInt(ele);
    }));
  });

  return input;
}

function gcd (a, b) {
  if (!b) {
    return a;
  }

  return gcd(b, a % b);
}

function lcm (a, b) {
  return a * b / gcd(a, b);
}

let input = readInput(),
  res = 0;

_.forEach(input, (ele) => {
  let next = ele[ele.length - 1],
    curr = ele;

  while (_.uniq(curr).length !== 1) {
    let newr = [];

    // curr.length && (console.log('curr', curr));

    for (let i = 1; i <= curr.length - 1; i++) {
      newr.push(curr[i] - curr[i - 1]);
    }

    // newr.length && (console.log('newr', newr));

    curr = newr;
    next = next + curr[curr.length - 1];
  }

  res += next;
});

console.log(res);
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
  let currNode = node,
    i = 0,
    cv = 0;

  while (currNode.charAt(currNode.length - 1) !== 'Z') {
    i = i % seq.length;

    const char = seq.charAt(i);

    currNode = edges[currNode][char];

    i++;
    cv++;
  }

  cycles.push(cv);
});

console.log(res);
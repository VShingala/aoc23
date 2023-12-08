const fs = require('fs'),
  _ = require('lodash');

function readInput () {
  var str = fs.readFileSync('input.txt', 'utf-8'),
    seq = str.split('\n')[0],
    edgeInp = str.split('\n').splice(2),
    edges = {};
  
  _.forEach(edgeInp, (ele) => {
    const data = ele.split(' = '),
      lr = data[1].split(', ');

    edges[data[0]] = {
      L: lr[0].substring(1, lr[0].length),
      R: lr[1].substring(0, lr[1].length - 1)
    }
  });

  return {
    seq: seq,
    edges: edges
  };
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
  seq = input.seq,
  edges = input.edges,
  currNodes = [],
  cycles = [],
  arrAllZ = false,
  res;

_.forEach(edges, (val, edge) => {
  if (edge.charAt(edge.length - 1) === 'A') {
    currNodes.push(edge);
  }
});

_.forEach(currNodes, (node) => {
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

res = cycles.reduce(lcm);

console.log(res);
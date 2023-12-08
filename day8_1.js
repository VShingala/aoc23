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

let input = readInput(),
  seq = input.seq,
  edges = input.edges,
  currNode = 'AAA',
  i = 0,
  res = 0;

while (currNode !== 'ZZZ') {
  i = i % seq.length;

  const char = seq.charAt(i);

  currNode = edges[currNode][char];

  i++;
  res++;
}

console.log(res);
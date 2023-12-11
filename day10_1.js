const fs = require('fs'),
  graphlib = require("graphlib"),
  _ = require('lodash');

function readInput () {
  var str = fs.readFileSync('input.txt', 'utf-8'),
    input = [],
    start = [];
  
  _.forEach(str.split('\n'), (ele, indx) => {
    input.push(_.map(ele.split(''), (ele2, indy) => {
      if (ele2 === 'S') {
        start = [indx, indy];
      }
      return ele2;
    }));
  });

  return {
    data: input,
    start: start
  };
}

function dfs(graph, start) {
  const stack = [start];
  const visited = new Set();
  const result = [];

  while (stack.length) {
    const vertex = stack.pop();

    if (vertex === start && result.length > 1) {
      break;
    }

    if (!visited.has(vertex)) {
      visited.add(vertex);
      result.push(vertex);

      for (const neighbor of graph[vertex]) {
        stack.push(neighbor);
      }
    }
  }

  return result;
}

const conn = {
  '-': [[0, -1], [0, 1]],
  '|': [[-1, 0], [1, 0]],
  'L': [[-1, 0], [0, 1]],
  'F': [[1, 0], [0, 1]],
  'J': [[-1, 0], [0, -1]],
  '7': [[0, -1], [1, 0]],
  '.': [],
  'S': [[0, -1], [0, 1], [-1, 0], [1, 0]]
};

let input = readInput(),
  g = {},
  data = input.data,
  start = input.start,
  res;

for (i = 0; i < data.length; i++) {
  for (j = 0; j < data[i].length; j++) {
    g[i + ',' + j] = [];
  }
}

for (i = 0; i < data.length; i++) {
  for (j = 0; j < data[i].length; j++) {
    const conns = conn[data[i][j]];

    _.forEach(conns, (ele) => {
      let nx = i + ele[0],
        ny = j + ele[1];

      if (nx < data.length && ny < data[0].length && nx >= 0 && ny >= 0) {
        // if (data[i][j] !== 'S') {
        //   g[i + ',' + j].push(nx + ',' + ny);
        // }
        g[i + ',' + j].push(nx + ',' + ny);
      }
    });
  }
}

const d = dfs(g, start[0] + ',' + start[1]);

res = d.length / 2;

console.log(res);

// Part 2: To be done with flood fill algorithm.

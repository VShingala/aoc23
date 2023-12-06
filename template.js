const fs = require('fs'),
  _ = require('lodash');

function readInput () {
  var str = fs.readFileSync('input.txt', 'utf-8');
  return _.map(str.split('\n'), (ele) => {
    // return JSON.parse(ele);
    return ele;
    // return ele.split('-');
    // return _.map(ele.split(','), (io) => {
    //   return io.split(' ');
    // });
    // let ar = [];
    // for (let i = 0; i < ele.length; i++) {
    //   ar.push(_.toInteger(ele.charAt(i)));
    // }
    // return ar;
  });
}

let input = readInput(),
 res = 0;

// do stuff

console.log(res);

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

const nums = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];

_.forEach(input, (ele) => {
  let first = null,
    last = null;

  for (let i = 0; i < ele.length; i++) {
    if (nums.includes(ele.charAt(i))) {
      first = ele.charAt(i);
      break;
    }
  }

  for (let i = ele.length - 1; i >= 0; i--) {
    if (nums.includes(ele.charAt(i))) {
      last = ele.charAt(i);
      break;
    }
  }

  console.log(parseInt(first + last));

  res += parseInt(first + last);
});

console.log(res);
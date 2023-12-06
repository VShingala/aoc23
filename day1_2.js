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

const nums = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
 dnums = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];

_.forEach(input, (ele) => {
  let first = null,
    last = null,
    fdn = null;
    fdnv = null,
    ldn = null,
    ldnv = null;

  for (let i = 0; i < ele.length; i++) {
    if (nums.includes(ele.charAt(i))) {
      first = i;
      break;
    }
  }

  for (let i = ele.length - 1; i >= 0; i--) {
    if (nums.includes(ele.charAt(i))) {
      last = i;
      break;
    }
  }

  for (let i = 0; i < dnums.length; i++) {
    let e = ele.indexOf(dnums[i]);
    if (e > -1) {
      if (fdn === null) {
        fdn = e;
        fdnv = '' + (i + 1);
      }
      else if (e < fdn) {
        fdn = e;
        fdnv = '' + (i + 1);
      }
    }
  }

  for (let i = 0; i < dnums.length; i++) {
    let e = ele.lastIndexOf(dnums[i]);
    if (e > -1) {
      if (ldn === null) {
        ldn = e;
        ldnv = '' + (i + 1);
      }
      else if (e > ldn) {
        ldn = e;
        ldnv = '' + (i + 1);
      }
    }
  }

  if (first === null) {
    first = fdnv;
  }
  else if (fdn === null) {
    first = ele.charAt(first);
  }
  else if (fdn < first) {
    first = fdnv;
  }
  else {
    first = ele.charAt(first);
  }

  if (last === null) {
    last = ldnv;
  }
  else if (ldn === null) {
    last = ele.charAt(last);
  }
  else if (ldn > last) {
    last = ldnv;
  }
  else {
    last = ele.charAt(last);
  }

  console.log(first, last);

  res += parseInt(first + last);
});

console.log(res);
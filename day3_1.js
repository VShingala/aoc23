const fs = require('fs'),
  _ = require('lodash');

function readInput () {
  var str = fs.readFileSync('input.txt', 'utf-8');
  return _.map(str.split('\n'), (ele) => {
    let ar = [];

    for (let i = 0; i < ele.length; i++) {
      ar.push(ele.charAt(i));
    }

    return ar;
  });
}

const nums = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];

let input = readInput(),
  res = 0;

_.forEach(input, (row, ind) => {
  let currnum = '',
    shouldInclude = false;

  _.forEach(row, (ele, ind2) => {
    if (nums.includes(ele)) {
      currnum += ele;

      if (!shouldInclude) {
        for (i = -1; i < 2; i++) {
          for (j = -1; j < 2; j++) {
            if (i === 0 && j === 0) {
              continue;
            }
    
            if (input[ind + i] === undefined || input[ind + i][ind2 + j] === undefined) {
              continue;
            }

            let val = input[ind + i][ind2 + j];
    
            if (!nums.includes(val) && val !== '.') {
              shouldInclude = true;
              // console.log(ind + i, ind2 + j, val);
            }        
          }
        }
      }

      if (ind2 === row.length - 1 && shouldInclude) {
        res += parseInt(currnum);

        currnum = '';
        shouldInclude = false;
      }
    }
    else if (currnum.length > 0) {
      if (shouldInclude) {
        res += parseInt(currnum);
      }

      currnum = '';
      shouldInclude = false;
    }
  });
});

console.log(res);
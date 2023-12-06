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
  gears = {},
  gearRatio = 0;
  res = 0;

_.forEach(input, (row, ind) => {
  let currnum = '',
    spi = '';
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

              if (val === '*') {
                spi = (ind + i) + ',' + (ind2 + j);
              }
            }
          }
        }
      }

      if (ind2 === row.length - 1 && shouldInclude) {
        res += parseInt(currnum);

        if (spi) {
          if (!gears[spi]) {
            gears[spi] = [];
          }
          gears[spi].push(parseInt(currnum));
          spi = '';
        }

        currnum = '';
        shouldInclude = false;
      }
    }
    else if (currnum.length > 0) {
      if (shouldInclude) {
        res += parseInt(currnum);

        if (spi) {
          if (!gears[spi]) {
            gears[spi] = [];
          }
          gears[spi].push(parseInt(currnum));
          spi = '';
        }
      }

      currnum = '';
      shouldInclude = false;
    }
  });
});

_.forEach(gears, (gear, ind) => {
  console.log(ind, gear);
  if (gear.length === 2) {
    gearRatio += (gear[0] * gear[1]); 
  }
});

console.log(gearRatio);
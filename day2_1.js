const fs = require('fs'),
  _ = require('lodash');

function readInput () {
  var str = fs.readFileSync('input.txt', 'utf-8');
  return _.map(str.split('\n'), (ele) => {
    const gamedata = ele.split(':')[1];
      tries = gamedata.split(';');

    return _.map(tries, (rnd) => {
      const data = rnd.split(',');

      let r = 0, g = 0, b = 0;

      _.forEach(data, (dt) => {
        const val = parseInt(dt);
        if (dt.includes('red')) {
          r = val;
        }
        else if (dt.includes('green')) {
          g = val;
        }
        else if (dt.includes('blue')) {
          b = val;
        }
      });

      return [r, g, b];
    });
  });
}

const thres = [12, 13, 14];

let input = readInput(),
  res = 0;

_.forEach(input, (game, ind) => {
  let isValid = true;

  _.forEach(game, (rnd) => {
    _.forEach(thres, (thr, ind) => {
      if (rnd[ind] > thr) {
        isValid = false;
      }
    });
  });

  if (isValid) {
    res += (ind + 1);
  }
});

console.log(res);
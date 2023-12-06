const fs = require('fs'),
  _ = require('lodash');

function readInput () {
  var str = fs.readFileSync('input.txt', 'utf-8');
  return _.map(str.split('\n'), (ele) => {
    const gamedata = ele.split(':')[1];
      winnum = _.trim(gamedata.split('|')[0]),
      cardnum = _.trim(gamedata.split('|')[1]);

    let winnumarr = [],
      cardnumarr = [];

    _.forEach(winnum.split(' '), (ele) => {
      if (ele.length > 0) {
        winnumarr.push(_.toInteger(ele));
      }
    });

    _.forEach(cardnum.split(' '), (ele) => {
      if (ele.length > 0) {
        cardnumarr.push(_.toInteger(ele));
      }
    });

    return { winnum: winnumarr, cardnum: cardnumarr };
  });
}

let input = readInput(),
  res = Array(input.length).fill(1);

_.forEach(input, (card, ind) => {
  const intersection = _.intersection(card.winnum, card.cardnum);

  if (intersection.length) {
    for (let i = 1; i <= intersection.length; i++) {
      res[ind + i] = res[ind + i] + res[ind];
    }
  }
});

console.log(_.sum(res));
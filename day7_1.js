const fs = require('fs'),
  _ = require('lodash');

function readInput () {
  var str = fs.readFileSync('input.txt', 'utf-8'),
    cards = [],
    bids = [];
  
  _.forEach(str.split('\n'), (ele) => {
    const card = ele.split(' ')[0];
      bid = ele.split(' ')[1],
      cardRemapFrom = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2'],
      cardRemapTo = _.reverse(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M']),

      cardRemap = _.zipObject(cardRemapFrom, cardRemapTo),
      valuedCard = '';

    _.forEach(card.split(''), (ele) => {
      valuedCard = valuedCard + cardRemap[ele];
    });

    cards.push(valuedCard);
    bids.push(parseInt(bid));
  });

  return {
    cards: cards,
    bids: bids
  };
}

function getPrio (card) {
  const uniqueCards = _.uniq(card.split('')),
    cardMap = {};

  _.forEach(card.split(''), (ele) => {
    cardMap[ele] = cardMap[ele] || 0;
    cardMap[ele]++;
  });

  if (_.size(cardMap) === 1) {
    return 7;
  }
  else if (_.size(cardMap) === 2 && _.includes(_.values(cardMap), 4)) {
    return 6;
  }
  else if (_.size(cardMap) === 2 && _.includes(_.values(cardMap), 3)) {
    return 5;
  }
  else if (_.size(cardMap) === 3 && _.includes(_.values(cardMap), 3)) {
    return 4;
  }
  else if (_.size(cardMap) === 3 && _.includes(_.values(cardMap), 2)) {
    return 3;
  }
  else if (_.size(cardMap) === 4 && _.includes(_.values(cardMap), 2)) {
    return 2;
  }
  else {
    return 1;
  }
}

let input = readInput(),
  cards = input.cards,
  bids = input.bids,
  prios = _.map(cards, (card, ind) => { return { prio: getPrio(card), ind: ind, card: card }; }),
  res = 0,
  currRank = 1;

for (let i = 1; i <= 7; i++) {
  const samePrio = _.filter(prios, (ele) => { return ele.prio === i; }),
    sortedSamePrio = _.sortBy(samePrio, ['card']);

  _.forEach(sortedSamePrio, (ele, ind) => {
    res = res + bids[ele.ind] * (currRank);
    currRank++;
  });
}

console.log(res);
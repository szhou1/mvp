'use strict';

function Game() {
  this.DECK_SIZE = 52;
  this.center = [];
  this.players = makePlayers();
  this.currentPlayer = this.players[0];

};

function Player(name) {
  this.name = name;
  this.hand = [];
  
}

Game.prototype.slap = function(player, cb) {
  if(this.isSlappable()) {
    player.hand = player.hand.concat(this.center);
    this.center = [];
    if(cb) {
      cb(true);
    }
  } else {
    this.placeCard(player);
  }
}

Game.prototype.isSlappable = function() {

  var topcard = this.getTopcard();
  if(topcard && topcard.charAt(0)) {
    var number = topcard.charAt(0);
    if(number === 'J'
      || number === 'Q'
      || number ==='K'
      || number === 'A'
      ) {
      return true;
    }
  }
  return false;
}

Game.prototype.placeCard = function(player, cb) {
  if(player.hand.length > 0) {
    var card = player.hand.splice(0, 1)[0];
    console.log(player.name, " placed ", card);
    this.center.push(card);

    if(this.isSlappable()) {
      if(cb) {
        cb(true);
      }
    }

  } else {
    console.error('no cards to play for player ', player.name);
  }
};


Game.prototype.getTopcard = function() {
  if(!this.center && this.center.length < 1) {
    console.error('center is empty')
    return null;
  } else {
    return this.center[this.center.length-1];
  }
};


function makePlayers(deck) {
  var deck = makeDeck();
  var players = [];
  var NUM_PLAYERS = 4;

  for(var i=0; i<NUM_PLAYERS; i++) {
    var player = new Player(i);

    for(var j=0; j< (52 / NUM_PLAYERS); j++) {
      var index = Math.floor(Math.random() * deck.length);
      var card = deck[index];
      player.hand.push(card);
      deck.splice(index, 1);
    }

    players.push(player);

  }
  // console.log(players);
  return players;
};


function makeDeck() {
  var numbers = [2,3,4,5,6,7,8,9,10,'J','Q','K','A'];
  // var numbers = [2,3,'J','Q'];
  var suites = ['c', 'd', 'h', 's']

  var deck = [];
  for(var i=0; i<numbers.length; i++) {
    for(var s = 0; s<suites.length; s++) {
      deck.push(numbers[i] + suites[s]);
      // deck = deck.concat(deck.slice());
    }
  }
  // console.log(JSON.stringify(deck));
  // console.log(deck.length);
  return deck;
};

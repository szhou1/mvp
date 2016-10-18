'use strict';

function Game() {
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
  if(this.getTopcard() === 'J'
    || this.getTopcard() === 'Q'
    || this.getTopcard() ==='K'
    || this.getTopcard() === 'A'
    ) {
    return true;
  }
  return false;
}

Game.prototype.placeCard = function(player) {
  if(player.hand.length > 0) {
    var card = player.hand.splice(0, 1)[0];
    
    this.center.push(card);

    if(this.isSlappable()) {
      this.generateRandomSlap();
    }

  } else {
    console.error('no cards to play for player ', player.name);
  }

};

Game.prototype.generateRandomSlap = function() {
  var randPlayer = Math.ceil(Math.random() * (this.players.length-1));
  console.log('random player slap: ', randPlayer);
  this.slap(this.players[randPlayer]);

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

    for(var j=0; j< (deck.length / NUM_PLAYERS); j++) {
      var index = Math.floor(Math.random() * deck.length);
      var card = deck[index];
      player.hand.push(card);
      deck.splice(index, 1);
    }

    players.push(player);

  }
  return players;
};


function makeDeck() {
  // var deck = [2,3,4,5,6,7,8,9,10,'J','Q','K','A'];
  var deck = [2,3,'J','Q'];
  for(var i=0; i<2; i++) {
    deck = deck.concat(deck.slice());
  }

  return deck;
};

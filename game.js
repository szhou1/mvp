'use strict';

function Game() {
  console.log('initializing Game');
  this.center = [];
  this.players = makePlayers();
  this.currentPlayer = this.players[0];

  // this.runGame();

};

function Player(name) {
  this.name = name;
  this.hand = [];
  
}

Game.prototype.slap = function(player) {
  if(this.getTopcard() === 'J') {
    // collect all cards
    player.hand = player.hand.concat(this.center);
    this.center = [];
  } else {
    this.placeCard(player);
  }
}

Game.prototype.placeCard = function(player) {
  if(player.hand.length > 0) {
    var card = player.hand.splice(0, 1)[0];
    // console.log(player.hand.length);
    
    this.center.push(card);
    var game = this;
    if(player.name === 0) {
      // this.waitingForTurn = true;
      // this.runGame(function() {
      //   game.waitingForTurn = false;
      // });
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

// Game.prototype.runGame = function(cb) {
//   // console.log('timeout');
//   var game = this;

//   var count = 1;
//   var endCount = 2;

//   var gameInterval = setInterval(function() {

//     setTimeout(function() {
//       console.log('inside timeout', game.players[count], count);

//       game.placeCard(game.players[count]);
//       count++;
//       game.waitingForTurn = false;
//       cb();
//     }, 0);

//     // console.log(count);
//     if(count > endCount) {
//       console.log('clear interval');
//       clearInterval(gameInterval);
//     }

//   }, 1000);

// }

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
  return players;
};


function makeDeck() {
  var deck = [1,2,3,4,5,6,7,8,9,10,'J','Q','K','A'];
  for(var i=0; i<2; i++) {
    deck = deck.concat(deck.slice());
  }

  return deck;
};

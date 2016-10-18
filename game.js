'use strict';

function Game() {
  console.log('initializing Game');
  this.center = [];
  this.players = makePlayers();
  console.log(this.players);

  // for(var i=0; i<20; i++) {
    
  // }

};

function Player(name) {
  this.name = name;
  this.hand = [];
  

  // this.slap = function() {
  //   if(topcard === 'J') {
  //     // collect all cards
  //     this.hand = this.hand.concat(center);
  //     center = [];
  //   } else {
  //     this.placeCard(this.hand);
  //   }
  // }
}

Game.prototype.placeCard = function(player) {
  if(player.hand.length > 0) {
    var card = player.hand.splice(0, 1)[0];
    console.log(player.hand.length);
    
    this.center.push(card);
  }

  console.log('no cards to play for player ', this.name);
};

// Player.prototype.placeCard = function(cb) {
//   if(this.hand.length > 0) {
//     var card = this.hand.splice(0, 1)[0];
//     console.log(this.hand.length);
    
//     cb(card); 
//   }

//   console.log('no cards to play for player ', this.name);
// };

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
  var deck = [1,2,3,4,5,6,7,8,9,'J','Q','K','A'];
  for(var i=0; i<2; i++) {
    deck = deck.concat(deck.slice());
  }

  return deck;
};

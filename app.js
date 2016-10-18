var app = angular.module('slapjackApp', []);

app.factory('gameFactory', function() {
  return new Game();
});

app.controller('mainController', function($scope, gameFactory) {
  $scope.game = gameFactory;
  // var deck = [1,2,3,4,5,6,7,8,9,'J','Q','K','A'];
  // for(var i=0; i<2; i++) {
  //   deck = deck.concat(deck.slice());
  // }
  // $scope.deck = deck;
  // $scope.center = [];
  // $scope.hand = [];

  // $scope.placeCard = function() {

  //   var index = Math.floor(Math.random() * $scope.deck.length);
  //   $scope.topcard = $scope.deck[index];

  //   $scope.center.push($scope.deck.splice(index, 1)[0]);
  //   console.log($scope.deck.length);
  //   $scope.hand = $scope.deck;

  // };

  // $scope.slap = function() {
  //   if($scope.topcard === 'J') {
  //     // collect all cards
  //     $scope.hand = $scope.hand.concat($scope.center);
  //     $scope.center = [];
  //   } else {
  //     $scope.placeCard();
  //   }
  // };

});


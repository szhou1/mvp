var app = angular.module('slapjackApp', []);

app.controller('mainController', function($scope) {
  var deck = [1,2,3,4,5,6,7,8,9,'J','Q','K','A'];
  for(var i=0; i<2; i++) {
    deck = deck.concat(deck.slice());
  }
  $scope.deck = deck;
  $scope.center = [];
  $scope.hand = [];

  $scope.placeCard = function() {

    var index = Math.floor(Math.random() * $scope.deck.length);
    $scope.card = $scope.deck[index];

    $scope.center.push($scope.deck.splice(index, 1)[0]);
    console.log($scope.deck.length);
    $scope.hand = $scope.deck;
  };

  $scope.slap = function() {

  };
});


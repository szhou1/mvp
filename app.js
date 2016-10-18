var app = angular.module('slapjackApp', []);

app.factory('game', function() {
  return new Game();
});

app.controller('mainController', function($scope, $interval, game) {
  $scope.game = game;
  $scope.currentPlayer = game.players[0];
  var gameInterval;
  var count = 1;
  
  $scope.placeCard = function() {
    game.placeCard(game.players[0]);
    startOpp();
  }



  var stopInterval = function() {
    if(angular.isDefined(gameInterval)) {
      $interval.cancel(gameInterval);
      gameInterval = undefined;
      $scope.waitingForTurn = false;
      count = 1;
    }
  }

  
  var startOpp = function() {
    $scope.waitingForTurn = true;

    gameInterval = $interval(function() {
      console.log("hi")
      $scope.currentPlayer = game.players[count];
      game.placeCard(game.players[count]);

      count++;
      if(count > 3) {
        stopInterval();
      }
    }, 1000);
    
  }

});


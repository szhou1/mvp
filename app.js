var app = angular.module('slapjackApp', []);

app.factory('game', function() {
  return new Game();
});

app.controller('mainController', function($scope, $interval, $timeout, game) {
  $scope.game = game;
  $scope.currentPlayer = game.players[0];
  var gameInterval;
  var count = 1;
  
  var generateRandomSlap = function(isSlappable) {
    if(isSlappable) {
      var randPlayer = Math.ceil(Math.random() * (game.players.length-1));

      var randDelay = Math.floor(Math.random() * 600) + 300;
      $timeout(function() {
        console.log('random player slap: ', randPlayer);
        // console.log('SLAP')
        game.slap(game.players[randPlayer], function(success) {
          console.log('successful slap by ', randPlayer);
          count = randPlayer;
        });
      }, randDelay);
    }
  }

  $scope.humanPlaceCard = function() {
    game.placeCard(game.players[0], generateRandomSlap);
    startInterval();
  }

  $scope.humanSlap = function() {
    game.slap(game.players[0], function(success) {
      if(success) {
        console.log('success')
        stopInterval();
      }
    });
  }



  var stopInterval = function() {
    if(angular.isDefined(gameInterval)) {
      $interval.cancel(gameInterval);
      gameInterval = undefined;
      $scope.waitingForTurn = false;
      count = 1;
    }
  }

  
  var startInterval = function() {
    $scope.waitingForTurn = true;

    gameInterval = $interval(function() {

      $scope.currentPlayer = game.players[count];
      game.placeCard(game.players[count], generateRandomSlap);

      count++;
      if(count > 3) {
        stopInterval();
      }
    }, 1000);
    
  }

});


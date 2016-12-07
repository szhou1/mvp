var app = angular.module('slapjackApp', []);

app.factory('game', function() {
  return new Game();
});

app.controller('mainController', function($scope, $interval, $timeout, $window, game) {
  $scope.game = game;
  $scope.currentPlayer = game.players[0];
  var gameInterval;
  var count = 1;
  
  var generateRandomSlap = function(isSlappable) {
    if(isSlappable) {
      var randPlayer = Math.ceil(Math.random() * (game.players.length-1));
      var randDelay = Math.floor(Math.random() * 600) + 400;

      $timeout(function() {
        console.log('random player slap: ', randPlayer);
        game.slap(game.players[randPlayer], function(success) {
          console.log('successful slap by ', randPlayer);
          count = randPlayer;
        });
      }, randDelay);
    }
  }

  $scope.humanPlaceCard = function() {
    game.placeCard(game.players[0], generateRandomSlap);
    determineGameOver();

    startInterval();
  }

  $scope.humanSlap = function() {
    game.slap(game.players[0], function(success) {
      if(success) {
        console.log('success')
        stopInterval();
        // if(determineGameOver()){
        //   $scope.gameOver = true;
        // }
      }
    });
    determineGameOver();
  }

  var determineGameOver = function() {
    var win = false;
    for(var i=0; i<game.players.length; i++) {
      if(game.players[i].hand.length === game.DECK_SIZE) {
        console.log("Player ", game.players[i].name, " wins!");
        $scope.win = true;
        $scope.gameOver = true;
        break;
      } else if(game.players[0].hand.length === 0) {
        $scope.win = false;
        $scope.gameOver = true;
      }
    }
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
    }, (Math.random() * 1000) + 1000);
    
  }

});


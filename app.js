var app = angular.module('slapjackApp', []);

app.factory('gameFactory', function() {
  return new Game();
});

app.controller('mainController', function($scope, gameFactory) {
  $scope.game = gameFactory;
});


/**
 * This is for the graph anchor in order to show up the graph only when the
 * button is clicked this uses graph in d3.js.
 * Created by Minki Chung / Daniel Suh on 8/9/16.
 */
((function vganchorController() {
    angular
        .module('vganchor')
        .controller('vganchorCtrl', ['$scope', '$http', 'socketFactory', '$location',
          function($scope, $http, socketFactory, $location) {
            $scope.graphOn = false;
            $scope.bettingOn = false;
            $scope.kisweOn = false;

            $scope.graphTurnOn = function() {
              if ($scope.graphOn === true) {
                $scope.kisweOn = false;
                $scope.graphOn = false;
                $scope.bettingOn = false;
              } else {
                $scope.kisweOn = true;
                $scope.graphOn = true;
                $scope.bettingOn = false;
              }
            };

            $scope.bettingTurnOn = function() {
              if ($scope.bettingOn === true) {
                $scope.kisweOn = false;
                $scope.graphOn = false;
                $scope.bettingOn = false;
              } else {
                $scope.kisweOn = true;
                $scope.graphOn = false;
                $scope.bettingOn = true;
              }
            };

            $scope.returnHome = function() {
              if ($scope.kisweOn === true) {
                $scope.kisweOn = false;
                $scope.graphOn = false;
                $scope.bettingOn = false;
              }
            };

            /**
             * Moves to the empty page.
             */
            $scope.goToEmptyPage = function() {
              $location.path('/empty');
            };

            /**
             * Socket function that wraps the goToEmptyPage function,
             * run on receiving 'goToEmptyPage' message.
             */
            socketFactory.on('goToGanchorEmpty', function() {
              console.log('goToGanchorEmpty call received - vganchor');
              $scope.$apply(function() {
                $scope.goToEmptyPage();
              });
            });
        }]);
})());

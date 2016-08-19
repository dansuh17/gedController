/**
 * This is for the graph anchor in order to show up the graph only when the
 * button is clicked this uses graph in d3.js.
 * Created by Minki Chung / Daniel Suh on 8/9/16.
 */
((function vganchorController() {
  angular
        .module('vganchor')
        .controller('VganchorController', ['$scope', '$http', 'socketFactory', '$location',
          function ($scope, $http, socketFactory, $location) {
            var vm = this;
            vm.graphOn = false;
            vm.bettingOn = false;
            vm.kisweOn = false;

            vm.graphTurnOn = function () {
              if (vm.graphOn === true) {
                vm.kisweOn = false;
                vm.graphOn = false;
                vm.bettingOn = false;
              } else {
                vm.kisweOn = true;
                vm.graphOn = true;
                vm.bettingOn = false;
              }
            };

            vm.bettingTurnOn = function () {
              if (vm.bettingOn === true) {
                vm.kisweOn = false;
                vm.graphOn = false;
                vm.bettingOn = false;
              } else {
                vm.kisweOn = true;
                vm.graphOn = false;
                vm.bettingOn = true;
              }
            };

            vm.returnHome = function () {
              if (vm.kisweOn === true) {
                vm.kisweOn = false;
                vm.graphOn = false;
                vm.bettingOn = false;
              }
            };

            /**
             * Moves to the empty page.
             */
            vm.goToEmptyPage = function () {
              $location.path('/empty');
            };

            /**
             * Socket function that wraps the goToEmptyPage function,
             * run on receiving 'goToEmptyPage' message.
             */
            socketFactory.on('vganchor_set_empty', function () {
              $scope.$apply(function () {
                vm.goToEmptyPage();
              });
            });
          }]);
})());

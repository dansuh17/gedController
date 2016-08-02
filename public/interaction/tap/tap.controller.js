/**
 * Controller for tapping events.
 * by Daniel Suh 7/28/2016
 */
;(function() {
  angular
      .module('tap')
      .controller('tapCtrl', ['$scope', 'socketFactory', function ($scope, socketFactory) {
        // cute kiswe logo
        $scope.logoUrl = '../assets/images/kisweLogo.png';

        /**
         * Moves the balance bar by AMOUNT. This calls the 'addPowerBalance' function
         * in power bar controller of the resting page through socket.
         * @param amount the amount to change the balance bar
         */
        $scope.moveBalanceBar = function(amount) {
          console.log('moveBalanceBar emit : ' + amount);
          socketFactory.emit('addPowerBalance', {amount: amount});
        };
      }]);
})();

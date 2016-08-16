/**
 * Controller for tapping events.
 * by Daniel Suh 7/28/2016
 */
;(function() {
  angular
      .module('tap')
      .controller('tapCtrl', ['$scope', 'socketFactory', function ($scope, socketFactory) {
        // cute kiswe logo
        $scope.logoUrl = '../../assets/images/kisweLogo.png';
        $scope.punchImage1 = '../../assets/images/punch_grey.png'; // left
        $scope.punchImage2 = '../../assets/images/punch_red.png'; // right
        $scope.fighterCount1 = 0;
        $scope.fighterCount2 = 0;

        /**
         * Increment per tap the punch count for each fighter.
         * @param num the fighter number.
         */
        $scope.increaseFighterPunchCount = function(num) {
          if (num == 1) {
            $scope.fighterCount1++;
          } else if (num == 2) {
            $scope.fighterCount2++;
          }
        };

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

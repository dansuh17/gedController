/**
 * Controller for the power balance bar.
 */
;(function() {
  angular
      .module('gedApp')
      .controller('powerCtrl', ['$scope', 'socket', function ($scope, socket) {

        $scope.powerBalance = 50;

        /**
         * Sets the power balance. If power balance is under 50, it indicates
         * that the right side has dominance over left, and vice versa.
         * @param newBalance power balance amount. 0 ~ 99
         */
        $scope.setPowerBalance = function (newBalance) {
          $scope.powerBalance = newBalance;
        };

        $scope.powerToLeft = function () {
          $scope.powerBalance -= 5;
        };

        $scope.powerToRight = function () {
          $scope.powerBalance += 5;
        };

        socket.on('powerToLeft', function() {
          console.log('powerToLeft received');
          $scope.apply(function() {
            $scope.powerToLeft();
          });
        });

        socket.on('powerToRight', function() {
          console.log('powerToRight received');
          $scope.apply(function() {
            $scope.powerToRight();
          });
        });

        socket.on('setPowerBalance', function (data) {
          console.log('setPowerBalance received.' + data.balance);
          $scope.apply(function () {
            $scope.setPowerBalance(parseInt(data.balance, 10));
          });
        });
      }])
})();

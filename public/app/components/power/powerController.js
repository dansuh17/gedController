/**
 * Controller for the power balance bar.
 */
;(function() {
  angular
      .module('gedApp')
      .controller('powerCtrl', ['$scope', 'socket', function ($scope, socket) {

        $scope.powerBalance = 50;
        $scope.leftColor = 'grad-normal';
        $scope.rightColor = 'grad-normal';

        /**
         * Sets the power balance. If power balance is under 50, it indicates
         * that the right side has dominance over left, and vice versa.
         * @param newBalance power balance amount. 0 ~ 99
         */
        $scope.setPowerBalance = function (newBalance) {
          $scope.powerBalance = newBalance;
          $scope.applyStatusColor();
        };

        $scope.powerToLeft = function () {
          $scope.powerBalance -= 5;
          $scope.applyStatusColor();
        };

        $scope.powerToRight = function () {
          $scope.powerBalance += 5;
          $scope.applyStatusColor();
        };

        /**
         * Applies appropriate color to the power bars
         * according the the balance status.
         */
        $scope.applyStatusColor = function() {
          if (powerBalance >= 67) {
            $scope.leftColor = 'grad-safe';
            $scope.rightColor = 'grad-danger';
          } else if (powerBalance >= 33) {
            $scope.leftColor = 'grad-normal';
            $scope.rightColor = 'grad-normal';
          } else {
            $scope.leftColor = 'grad-danger';
            $scope.rightColor = 'grad-safe';
          }
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

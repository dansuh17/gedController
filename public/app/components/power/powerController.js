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

        /**
         * Adds the AMOUNT to the power balance bar. AMOUNT can be negative.
         * It also prevents the bar from exceeding its length.
         * @param amount amount change of power balance. Positive values move
         * the bar to the right, and vice versa.
         */
        $scope.addPowerBalance = function (amount) {
          $scope.powerBalance += amount;
          if ($scope.powerBalance > 99) {
            $scope.powerBalance = 99;
          } else if ($scope.powerBalance < 0) {
            $scope.powerBalance = 0;
          }
          $scope.applyStatusColor();
        };

        $scope.powerToLeft = function () {
          $scope.addPowerBalance(-5);
        };

        $scope.powerToRight = function () {
          $scope.addPowerBalance(5);
        };

        /**
         * Applies appropriate color to the power bars
         * according the the balance status.
         */
        $scope.applyStatusColor = function() {
          if ($scope.powerBalance >= 67) {
            $scope.rightColor = 'grad-danger';
            $scope.leftColor = 'grad-safe';
          } else if ($scope.powerBalance >= 33) {
            $scope.leftColor = 'grad-normal';
            $scope.rightColor = 'grad-normal';
          } else {
            $scope.leftColor = 'grad-danger';
            $scope.rightColor = 'grad-safe';
          }
        };

        socket.on('addPowerBalance', function(data) {
          console.log('addPowerBalance received: ' + data.amount);
          $scope.$apply(function() {
            $scope.addPowerBalance(data.amount);
          });
        });

        socket.on('powerToLeft', function() {
          console.log('powerToLeft received');
          $scope.$apply(function() {
            $scope.powerToLeft();
          });
        });

        socket.on('powerToRight', function() {
          console.log('powerToRight received');
          $scope.$apply(function() {
            $scope.powerToRight();
          });
        });

        socket.on('setPowerBalance', function (data) {
          console.log('setPowerBalance received.' + data.balance);
          $scope.$apply(function () {
            $scope.setPowerBalance(parseInt(data.balance, 10));
          });
        });
      }])
})();

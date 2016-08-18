/**
 * Controller for the power balance bar.
 */
(function () {
  angular
      .module('gedApp')
      .controller('PowerController', ['$scope', 'socket', '$interval', '$log', 'powerFactory',
        function ($scope, socket, $interval, $log, powerFactory) {
          var vm = this;
          vm.powerBalance = 50;
          vm.leftColor = 'grad-normal';
          vm.rightColor = 'grad-normal';

          /**
           * Makes an ajax call for every 2 seconds to retrieve the power balance data.
           */
          $interval(function () {
            powerFactory.votes_get().then(function (response) {
              var fighter1 = response.data.fighter1;
              var fighter2 = response.data.fighter2;
              var balance = (100 * fighter1) / (fighter1 + fighter2);
              vm.powerBalance = Math.round(balance);
            });
          }, 2000);

          /**
           * Sets the power balance. If power balance is under 50, it indicates
           * that the right side has dominance over left, and vice versa.
           * @param newBalance power balance amount. 0 ~ 99
           */
          vm.setPowerBalance = function (newBalance) {
            vm.powerBalance = newBalance;
            vm.applyStatusColor();
          };

          /**
           * Adds the AMOUNT to the power balance bar. AMOUNT can be negative.
           * It also prevents the bar from exceeding its length.
           * @param amount amount change of power balance. Positive values move
           * the bar to the right, and vice versa.
           */
          vm.addPowerBalance = function (amount) {
            vm.powerBalance += amount;
            if (vm.powerBalance > 99) {
              vm.powerBalance = 99;
            } else if (vm.powerBalance < 0) {
              vm.powerBalance = 0;
            }
            vm.applyStatusColor();
          };

          vm.powerToLeft = function () {
            vm.addPowerBalance(-5);
          };

          vm.powerToRight = function () {
            vm.addPowerBalance(5);
          };

          /**
           * Applies appropriate color to the power bars
           * according the the balance status.
           */
          vm.applyStatusColor = function () {
            if (vm.powerBalance >= 67) {
              vm.rightColor = 'grad-danger';
              vm.leftColor = 'grad-safe';
            } else if (vm.powerBalance >= 33) {
              vm.leftColor = 'grad-normal';
              vm.rightColor = 'grad-normal';
            } else {
              vm.leftColor = 'grad-danger';
              vm.rightColor = 'grad-safe';
            }
          };

          socket.on('addPowerBalance', function (data) {
            $log.log('addPowerBalance received: ' + data.amount);
            $scope.$apply(function () {
              vm.addPowerBalance(data.amount);
            });
          });

          socket.on('powerToLeft', function () {
            $log.log('powerToLeft received');
            $scope.$apply(function () {
              vm.powerToLeft();
            });
          });

          socket.on('powerToRight', function () {
            $log.log('powerToRight received');
            $scope.$apply(function () {
              vm.powerToRight();
            });
          });

          socket.on('setPowerBalance', function (data) {
            $log.log('setPowerBalance received.' + data.balance);
            $scope.$apply(function () {
              vm.setPowerBalance(parseInt(data.balance, 10));
            });
          });
        }]);
})();


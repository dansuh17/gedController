/**
 * Time controller.
 * Controls the time and round numbers for current round.
 */
(function () {
  angular
      .module('gedApp')
      .controller('TimeController', ['$scope', 'socket', '$log', function ($scope, socket, $log) {
        var vm = this;
        vm.roundNo = 1;

        vm.finish_callback = function () {
          $log.log('timer finished. socket call for now.');
          socket.emit('timerCmd', {
            timerCmd: 'finished'
          });
        }

        vm.setRoundNo = function (no) {
          vm.roundNo = no;
        };

        socket.on('roundNo', function (data) {
          $log.log('roundNo received.' + data.roundNo);

          $scope.$apply(function () {
            vm.setRoundNo(data.roundNo);
          });
        });

        vm.timerRunning = false;

        socket.on('timerCmd', function (data) {
          $log.log('timer command received. ' + data.timerCmd);

          if (data.timerCmd === 'stop') {
            $scope.$apply(function () {
              $scope.$broadcast('timer-stop');
              vm.timerRunning = false;
            });
          }

          if (data.timerCmd === 'start') {
            $scope.$apply(function () {
              $scope.$broadcast('timer-start');
              vm.timerRunning = true;
            });
          }

          if (data.timerCmd === 'reset') {
            $scope.$apply(function () {
              $scope.$broadcast('timer-reset');
              vm.timerRunning = false;
            });
          }

          if (data.timerCmd === 'setCountdown') {
            $scope.$broadcast('timer-set-countdown', data.countdown);
          }
        });
      }]);
})();

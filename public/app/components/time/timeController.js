/**
 * Time controller.
 * Controls the time and round numbers for current round.
 */
(function () {
  angular
      .module('gedApp')
      .controller('TimeController', ['$scope', 'socket', function ($scope, socket) {
        var vm = this;
        vm.roundNo = 1;

        vm.finish_callback = function () {
          console.log('timer finished. socket call for now.');
          socket.emit('timerCmd', {
            timerCmd: 'finished'
          });
        }

        vm.setRoundNo = function (no) {
          vm.roundNo = no;
        };

        socket.on('roundNo', function (data) {
          console.log('roundNo received.' + data.roundNo);

          $scope.$apply(function () {
            vm.setRoundNo(data.roundNo);
          });
        });

        vm.timerRunning = false;

        socket.on('timerCmd', function (data) {
          console.log('timer command received. ' + data.timerCmd);

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

/**
 * Time controller.
 * Controls the time and round numbers for current round.
 */
(function () {
  angular
      .module('gedApp')
      .controller('TimeController', ['$scope', 'socket', function ($scope, socket) {
        $scope.roundNo = 1;

        $scope.finish_callback = function () {
          console.log('timer finished. socket call for now.');
          socket.emit('timerCmd', {
            timerCmd: 'finished'
          });
        }

        $scope.setRoundNo = function (no) {
          $scope.roundNo = no;
        };

        socket.on('roundNo', function (data) {
          console.log('roundNo received.' + data.roundNo);

          $scope.$apply(function () {
            $scope.setRoundNo(data.roundNo);
          });
        });

        $scope.timerRunning = false;

        socket.on('timerCmd', function (data) {
          console.log('timer command received. ' + data.timerCmd);

          if (data.timerCmd === 'stop') {
            $scope.$apply(function () {
              $scope.$broadcast('timer-stop');
              $scope.timerRunning = false;
            });
          }

          if (data.timerCmd === 'start') {
            $scope.$apply(function () {
              $scope.$broadcast('timer-start');
              $scope.timerRunning = true;
            });
          }

          if (data.timerCmd === 'reset') {
            $scope.$apply(function () {
              $scope.$broadcast('timer-reset');
              $scope.timerRunning = false;
            });
          }

          if (data.timerCmd === 'setCountdown') {
            $scope.$broadcast('timer-set-countdown', data.countdown);
          }
        });
      }]);
})();

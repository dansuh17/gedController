/**
 * Time controller.
 * Controls the time and round numbers for current round.
 */
;(function() {
  angular
      .module('gedApp')
      .controller('timeCtrl', ['$scope', 'socket', function ($scope, socket) {
        //roundNo
        $scope.roundNo = 1;

        $scope.setRoundNo = function (no) {
          $scope.roundNo = no;
        };

        socket.on('roundNo', function (data) {
          console.log("roundNo received." + data.roundNo);

          $scope.$apply(function () {
            $scope.setRoundNo(data.roundNo);
          });
        });

        //timer
        $scope.timerRunning = false;

        socket.on('timerCmd', function (data) {
          console.log("timer command received. " + data.timerCmd);

          if (data.timerCmd == "stop") {
            $scope.$apply(function () {
              $scope.$broadcast('timer-stop');
              $scope.timerRunning = false;
            });
          }

          if (data.timerCmd == "start") {
            $scope.$apply(function () {
              $scope.$broadcast('timer-start');
              $scope.timerRunning = true;
            });
          }

          if (data.timerCmd == "reset") {
            $scope.$apply(function () {
              $scope.$broadcast('timer-reset');
              $scope.timerRunning = false;
            });
          }

          if (data.timerCmd == "setCountdown") {
            $scope.$broadcast('timer-set-countdown', data.countdown);
          }
        });
      }]);
})();

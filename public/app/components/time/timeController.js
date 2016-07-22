app.controller('timeCtrl', ['$scope', 'socket', function($scope, socket) {
  //roundNo
  $scope.roundNo = 1;

  $scope.setRoundNo = function (no) {
    $scope.roundNo = no;
  }

  socket.on('roundNo', function (data) {
    console.log("roundNo received." + data.roundNo);

    $scope.$apply(function () {
      $scope.setRoundNo(data.roundNo);
    });
  });

  //timer
  $scope.timerRunning = false;

  $scope.startTimer = function () {
    $scope.$broadcast('timer-start');
    $scope.timerRunning = true;
  };

  $scope.stopTimer = function () {
    $scope.$broadcast('timer-stop');
    $scope.timerRunning = false;
  };

  $scope.resetTimer = function () {
    $scope.$broadcast('timer-reset');
    $scope.timerRunning = false;
  };

  socket.on('timerCmd', function (data) {
    console.log("timer command received. " + data.timerCmd);

    if (data.timerCmd == "stop") {
      $scope.$apply(function () {
        $scope.stopTimer();
      });
    }

    if (data.timerCmd == "start") {
      $scope.$apply(function () {
        $scope.startTimer();
      });
    }

    if (data.timerCmd == "reset") {
      $scope.$apply(function () {
        $scope.resetTimer();
      });
    }
  });

  $scope.timerRunning = true;
}]);

app.controller('MainCtrl', ['$scope', '$mdSidenav', 'socket', function($scope, $mdSidenav, socket){

  //roundNo
  $scope.roundNo = 1;

  $scope.setRoundNo = function(no) {
    $scope.roundNo = no;
  }

  socket.on('roundNo', function(data) {
    console.log("roundNo received." + data.roundNo);

    $scope.$apply(function () {
      $scope.setRoundNo(data.roundNo);
    });
  });

  //timer
  $scope.timerRunning = false;

  $scope.startTimer = function (){
    $scope.$broadcast('timer-start');
    $scope.timerRunning = true;
  };

  $scope.stopTimer = function (){
    $scope.$broadcast('timer-stop');
    $scope.timerRunning = false;
  };

  $scope.resetTimer = function() {
    $scope.$broadcast('timer-reset');
    $scope.timerRunning = false;
  };

  socket.on('timerCmd', function(data) {
    console.log("timer command received. " + data.timerCmd);

    if (data.timerCmd == "stop") {
      $scope.$apply(function() {
          $scope.stopTimer();
      });
    }

    if (data.timerCmd == "start") {
      $scope.$apply(function() {
          $scope.startTimer();
      });
    }
  });

  $scope.timerRunning = true;

  // players
  $scope.tom = {
    name: "Tom Marcellino",
    pic: "assets/images/profile1.png",
    headenergy: 80,
    bodyenergy: 70,
    headEnergyStatus: "progress-bar-success",
    bodyEnergyStatus: "progress-bar-success",
    bodypic: "assets/images/body1.svg"
  };

  $scope.devin = {
    name: "Devin Powell",
    pic: "assets/images/profile2.png",
    headenergy: 100,
    bodyenergy: 20,
    headEnergyStatus: "progress-bar-success",
    bodyEnergyStatus: "progress-bar-success",
    bodypic: "assets/images/body2.svg"
  };

  $scope.

  $scope.tomEnergyMinusFive = function() {
    $scope.tom.energy -= 5;

    if ($scope.tom.energy >= 80) {
      $scope.tom.energyStatus = "progress-bar-success";
    } else if ($scope.tom.energy >= 40) {
      $scope.tom.energyStatus = "progress-bar-warning";
    } else {
      $scope.tom.energyStatus = "progress-bar-danger";
    }
  };

  $scope.devinEnergyMinusFive = function() {
    $scope.devin.energy -= 5;

    if ($scope.devin.energy >= 80) {
      $scope.devin.energyStatus = "progress-bar-success";
    } else if ($scope.devin.energy >= 40) {
      $scope.devin.energyStatus = "progress-bar-warning";
    } else {
      $scope.devin.energyStatus = "progress-bar-danger";
    }
  };

  $scope.tomEnergyPlusTen = function() {
    $scope.tom.energy += 10;

    if ($scope.tom.energy >= 80) {
      $scope.tom.energyStatus = "progress-bar-success";
    } else if ($scope.tom.energy >= 40) {
      $scope.tom.energyStatus = "progress-bar-warning";
    } else {
      $scope.tom.energyStatus = "progress-bar-danger";
    }
  };

  $scope.devinEnergyPlusTen = function() {
    $scope.devin.energy += 10;

    if ($scope.devin.energy >= 80) {
      $scope.devin.energyStatus = "progress-bar-success";
    } else if ($scope.devin.energy >= 40) {
      $scope.devin.energyStatus = "progress-bar-warning";
    } else {
      $scope.devin.energyStatus = "progress-bar-danger";
    }
  };
}]);

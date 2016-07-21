app.controller('MainCtrl', ['$scope', '$mdSidenav', function($scope, $mdSidenav){

  $scope.roundNo = 1;

  $scope.setRoundNo = function(no) {
    $scope.roundNo = no;
  };

  $scope.toggleSidenav = function(menuId) {
    $mdSidenav(menuId).toggle();
  };

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

  $scope.timerRunning = true;

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

app.controller('MainCtrl', ['$scope', '$mdSidenav', function($scope, $mdSidenav){
  $scope.toggleSidenav = function(menuId) {
    $mdSidenav(menuId).toggle();
  };

  $scope.tom = {
    name: "Tom Marcellino",
    pic: "assets/images/profile1.png",
    energy: 80,
    energyStatus: "progress-bar-success"
  };

  $scope.devin = {
    name: "Devin Powell",
    pic: "assets/images/profile2.png",
    energy: 100,
    energyStatus: "progress-bar-success"
  };

  $scope.tomEnergyMinusFive = function() {
    $scope.tom.energy -= 5;

    if ($scope.tom.energy >= 80) {
      $scope.tom.energyStatus = "progress-bar-success";
    } else if ($scope.tom.energy >= 40) {
      $scope.tom.energyStatus = "progress-bar-warning";
    } else {
      $scope.tom.energyStatus = "progress-bar-danger";
    }
  }

  $scope.devinEnergyMinusFive = function() {
    $scope.devin.energy -= 5;

    if ($scope.devin.energy >= 80) {
      $scope.devin.energyStatus = "progress-bar-success";
    } else if ($scope.devin.energy >= 40) {
      $scope.devin.energyStatus = "progress-bar-warning";
    } else {
      $scope.devin.energyStatus = "progress-bar-danger";
    }
  }
}]);

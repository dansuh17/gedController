app.controller('MainCtrl', ['$scope', '$mdSidenav', 'socket', function($scope, $mdSidenav, socket){
  // players
  $scope.tom = {
    name: "Tom Marcellino"
  };

  $scope.devin = {
    name: "Devin Powell"
  };

  $scope.powerBalance = 40;

  /**
   * Call the appropriate function according to input arguments
   * @param fighter fighter's name - either 'tom' or 'devin'
   * @param part the part where damage was applied - either 'head' or 'body'
   * @param amount the amount of damage
   */
  $scope.energyChange = function(fighter, part, amount) {
    if (fighter == 'tom') {
      if (part == 'head') {
        $scope.$apply($scope.tomHeadEnergy(amount));
      } else {
        $scope.$apply($scope.tomBodyEnergy(amount));
      }
    } else {
      if (part == 'head') {
        $scope.$apply($scope.devinHeadEnergy(amount));
      } else {
        $scope.$apply($scope.devinBodyEnergy(amount));
      }
    }
  };

  socket.on('energyBarChange', function(data) {
    console.log("energyBar received.");
    //apply energybar accordingly.
    $scope.energyChange(data.fighter, data.part, parseInt(data.amount, 10));
  });


  /**
   * change tom's body energy by amount
   * @param amount
   */
  $scope.tomBodyEnergy = function(amount) {
    $scope.tom.bodyenergy += amount;

    if ($scope.tom.bodyenergy >= 80) {
      $scope.tom.bodyEnergyStatus = "progress-bar-success";
    } else if ($scope.tom.bodyenergy >= 40) {
      $scope.tom.bodyEnergyStatus = "progress-bar-warning";
    } else {
      $scope.tom.bodyEnergyStatus = "progress-bar-danger";
    }
  };

  /**
   * change devin's body energy by AMOUNT
   * @param amount the damage amount
   */
  $scope.devinBodyEnergy = function(amount) {
    $scope.devin.bodyenergy += amount;

    if ($scope.devin.bodyenergy >= 80) {
      $scope.devin.bodyEnergyStatus = "progress-bar-success";
    } else if ($scope.devin.bodyenergy >= 40) {
      $scope.devin.bodyEnergyStatus = "progress-bar-warning";
    } else {
      $scope.devin.bodyEnergyStatus = "progress-bar-danger";
    }
  };

  /**
   * change tom's head energy by AMOUNT
   * @param amount
   */
  $scope.tomHeadEnergy = function(amount) {
    $scope.tom.headenergy += amount;

    if ($scope.tom.headenergy >= 80) {
      $scope.tom.headEnergyStatus = "progress-bar-success";
    } else if ($scope.tom.headenergy  >= 40) {
      $scope.tom.headEnergyStatus = "progress-bar-warning";
    } else {
      $scope.tom.headEnergyStatus = "progress-bar-danger";
    }
  };

  /**
   * change devin's head energy by AMOUNT
   * @param amount
   */
  $scope.devinHeadEnergy = function(amount) {
    $scope.devin.headenergy += amount;

    if ($scope.devin.headenergy >= 80) {
      $scope.devin.headEnergyStatus = "progress-bar-success";
    } else if ($scope.devin.headenergy  >= 40) {
      $scope.devin.headEnergyStatus = "progress-bar-warning";
    } else {
      $scope.devin.headEnergyStatus = "progress-bar-danger";
    }
  };
}]);

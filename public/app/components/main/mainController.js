app.controller('MainCtrl', ['$scope', '$mdSidenav', 'socket', function($scope, $mdSidenav, socket){
  // players
  $scope.tom = {
    name: "Tom Marcellino"
  };

  $scope.devin = {
    name: "Devin Powell"
  };

  $scope.powerBalance = 22;

  /**
   * Sets the power balance. If power balance is under 50, it indicates
   * that the right side has dominance over left, and vice versa.
   * @param powerBalance power balance amount. 0 ~ 99
   */
  $scope.setPowerBalance = function(powerBalance) {
    $scope.powerBalance = powerBalance;
  };

  socket.on('setPowerBalance', function(data) {
    console.log('setPowerBalance received.' + data.balance);
    $scope.apply(function () {
      $scope.setPowerBalance(parseInt(data.balance, 10));
    });
  });
}]);

app.controller('MainCtrl', ['$scope', '$mdSidenav', function($scope, $mdSidenav){
        $scope.toggleSidenav = function(menuId) {
                $mdSidenav(menuId).toggle();
        };

        $scope.timerRunning = true;

  $scope.devin = {
    name: "Devin Powell",
    pic: "assets/images/profile1.png"
  };

  $scope.tom = {
    name: "Tom Marcellino",
    pic: "assets/images/profile2.png"
  };
}]);

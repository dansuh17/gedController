app.controller('MainCtrl', ['$scope', '$mdSidenav', function($scope, $mdSidenav){
        $scope.toggleSidenav = function(menuId) {
                $mdSidenav(menuId).toggle();
        };

        $scope.timerRunning = true;
}]);

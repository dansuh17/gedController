/**
 * Main controller.
 * Includes fighter's information.
 */
;(function() {
  angular.module('gedApp').controller('MainCtrl', ['$scope', '$mdSidenav', 'socket', function($scope, $mdSidenav, socket){
    // players
    $scope.tom = {
      name: "Tom Marcellino"
    };

    $scope.devin = {
      name: "Devin Powell"
    };
  }]);
})();

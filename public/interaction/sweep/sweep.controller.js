/**
 * Created by Daniel Suh on 7/28/16.
 */
;(function() {
  angular
      .module('sweep')
      .controller('sweepCtrl', ['$scope', '$timeout', function ($scope, $timeout) {

        $scope.endCommercial = function() {
          //window.close();
        };

        $timeout($scope.endCommercial, 10000);
      }]);
})();

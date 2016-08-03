/**
 * Created by Daniel Suh on 7/28/16.
 */
;(function() {
  angular
      .module('sweep')
      .controller('sweepCtrl', ['$scope', '$timeout', function ($scope, $timeout) {

        $scope.endCommercial = function() {
          //window.open("http://localhost:3000/interaction/vote/vote.html");
        };

        $timeout($scope.endCommercial, 1000);
      }]);
})();

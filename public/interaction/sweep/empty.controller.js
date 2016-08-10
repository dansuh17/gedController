/**
 * Controller for empty page, which contains no material except for listening to the call
 * to move to the sweep page.
 */
;(function() {
  angular
      .module('sweep')
      .controller('sweepEmptyCtrl', ['$scope', '$location', '$anchorScroll', 'socketFactory',
        function ($scope, $location, $anchorScroll, socketFactory) {
          /**
           * Moves to the sweep page.
           */
          $scope.goToSweepPage = function() {
            $location.path('/sweep_icon');
          };

          /**
           * Socket function that wraps the goToSweepPage function,
           * run on receiving 'goToSweepPage' message.
           */
          socketFactory.on('goToSweepPage', function() {
            console.log("goToSweepPage call received - empty");
            $scope.$apply(function() {
              $scope.goToSweepPage();
            })
          });
        }]);
})();

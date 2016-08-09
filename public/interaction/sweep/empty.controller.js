;(function() {
  angular
      .module('sweep')
      .controller('sweepEmptyCtrl', ['$scope', '$location', '$anchorScroll', 'socketFactory', '$timeout',
        function ($scope, $location, $anchorScroll, socketFactory, $timeout) {

          /**
           * Moves to the sweep page.
           */
          $scope.goToSweepPage = function() {
            $timeout(function() {
              // set the location - #sweep
              $location.hash('sweep');
              // move anchor to the location
              $anchorScroll();
            });
          };

          /**
           * Socket function that wraps the goToSweepPage function.
           */
          socketFactory.on('goToSweepPage', function() {
            console.log("goToSweepPage call received");
            $scope.$apply(function() {
              $scope.goToSweepPage();
            })
          });
        }]);
})();

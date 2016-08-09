;(function() {
  angular
      .module('sweep')
      .controller('sweepEmptyCtrl', ['$scope', '$location', '$anchorScroll', 'socketFactory',
        function ($scope, $location, $anchorScroll, socketFactory) {
          /**
           * Moves to the anchor with empty page.
           */
          $scope.goToEmptyPage = function() {
            // set the location - #empty
            $location.hash('empty');
            // move anchor to the location
            $anchorScroll();
          };

          /**
           * Socket function that wraps the goToEmptyPage function,
           * run on receiving 'goToEmptyPage' message.
           */
          socketFactory.on('goToEmptyPage', function() {
            console.log("goToEmptyPage call received");
            $scope.$apply(function() {
              $scope.goToEmptyPage();
            })
          });

          /**
           * Moves to the sweep page.
           */
          $scope.goToSweepPage = function() {
            // set the location - #sweep
            $location.hash('sweep');
            // move anchor to the location
            $anchorScroll();
          };

          /**
           * Socket function that wraps the goToSweepPage function,
           * run on receiving 'goToSweepPage' message.
           */
          socketFactory.on('goToSweepPage', function() {
            console.log("goToSweepPage call received");
            $scope.$apply(function() {
              $scope.goToSweepPage();
            })
          });
        }]);
})();

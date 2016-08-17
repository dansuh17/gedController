/**
 * Controller for empty page. Listens to a socket message indicating which sweep page to go.
 * by Daniel Suh 8/16/2016
 */
;(function() {
  angular
      .module('tap')
      .controller('tapEmptyCtrl', ['$scope', '$location', '$anchorScroll', 'socketFactory',
        function ($scope, $location, $anchorScroll, socketFactory) {

          /**
           * Moves to the sweep page.
           *
           * @param pageNum the number of sweep page.
           */
          $scope.goToTapPage = function() {
            var sPath = '/tap';
            $location.path(sPath);
          };

          /**
           * Socket function that wraps the goToTapPage function,
           * run on receiving 'goToTapPage' message.
           */
          socketFactory.on('tap_set', function() {
            console.log("goToTapPage call received from /empty");
            $scope.$apply(function() {
              $scope.goToTapPage();
            })
          });
        }]);
})();

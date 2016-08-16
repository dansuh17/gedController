/**
 * Controller for empty page. Listens to a socket message indicating which vganchor page to go.
 * by Daniel Suh 8/16/2016
 */
;(function() {
  angular
      .module('ganchor')
      .controller('ganchorEmptyCtrl', ['$scope', '$location', '$anchorScroll', 'socketFactory',
        function ($scope, $location, $anchorScroll, socketFactory) {

          /**
           * Moves to the ganchor page.
           */
          $scope.goToGanchorPage = function() {
            var sPath = '/vganchor';
            $location.path(sPath);
          };

          /**
           * Socket function that wraps the goToGanchorPage function,
           * run on receiving 'goToGanchorPage' message.
           */
          socketFactory.on('goToGanchorPage', function() {
            console.log("goToGanchorPage call received from /empty");
            $scope.$apply(function() {
              $scope.goToGanchorPage();
            })
          });
        }]);
})();

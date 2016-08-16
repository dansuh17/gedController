/**
 * Controller for empty page. Listens to a socket message indicating which sweep page to go.
 * by Daniel Suh 8/11/2016
 */
((function () {
  angular
      .module('sweep')
      .controller('sweepEmptyCtrl', ['$scope', '$location', '$anchorScroll', 'socketFactory',
        function angularModule($scope, $location, $anchorScroll, socketFactory) {

          /**
           * Moves to the sweep page.
           * @param pageNum the number of sweep page.
           */
          $scope.goToSweepPage = function(pageNum) {
            var sPath = '/empty';
            if (pageNum == 1) {
              sPath = '/sweep_icon';
            } else if (pageNum == 2) {
              sPath = '/sweep_gloves';
            } else if (pageNum == 3) {
              sPath = '/sweep_heart';
            }
            $location.path(sPath);
          };

          /**
           * Socket function that wraps the goToSweepPage function,
           * run on receiving 'goToSweepPage' message.
           */
          socketFactory.on('goToSweepPage', function(data) {
            console.log("goToSweepPage call received from /empty" + data.pageNum);
            $scope.$apply(function() {
              $scope.goToSweepPage(parseInt(data.pageNum));
            })
          });
        }]);
})());

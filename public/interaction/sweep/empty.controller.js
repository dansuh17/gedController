/**
 * Controller for empty page. Listens to a socket message indicating which sweep page to go.
 * by Daniel Suh 8/11/2016
 */
((function SweepController() {
  angular
      .module('sweep')
      .controller('SweepEmptyController', ['$scope', '$location', 'socketFactory', '$log',
        function angularModule($scope, $location, socketFactory, $log) {
          var vm = this;

          /**
           * Moves to the sweep page.
           * @param pageNum the number of sweep page.
           */
          vm.goToSweepPage = function goToSweepPage(pageNum) {
            var sPath = '/empty';
            if (pageNum === 1) {
              sPath = '/sweep_icon';
            } else if (pageNum === 2) {
              sPath = '/sweep_gloves';
            } else if (pageNum === 3) {
              sPath = '/sweep_heart';
            }
            $location.path(sPath);
          };

          /**
           * Socket function that wraps the goToSweepPage function,
           * run on receiving 'goToSweepPage' message.
           */
          socketFactory.on('goToSweepPage', function goToSweepPageCallback(data) {
            $log('goToSweepPage call received from /empty' + data.pageNum);
            $scope.$apply(function goToSweepApplyCallback() {
              vm.goToSweepPage(parseInt(data.pageNum, 10));
            });
          });
        }]);
})());

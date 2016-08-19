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
          vm.goToSweepPage = function goToSweepPage(page) {
            var sPath = '/empty';
            if (page === 1) {
              sPath = '/sweep_icon';
            } else if (page === 2) {
              sPath = '/sweep_gloves';
            } else if (page === 3) {
              sPath = '/sweep_heart';
            }
            $location.path(sPath);
          };

          /**
           * Socket function that wraps the goToSweepPage function,
           * run on receiving 'goToSweepPage' message.
           */
          socketFactory.on('sweep_set', function goToSweepPageCallback(data) {
            $log.log('goToSweepPage call received from /empty' + data.page);
            $scope.$apply(function goToSweepApplyCallback() {
              vm.goToSweepPage(parseInt(data.page, 10));
            });
          });
        }]);
})());

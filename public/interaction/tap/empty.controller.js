/**
 * Controller for empty page. Listens to a socket message indicating which sweep page to go.
 * by Daniel Suh 8/16/2016
 */
((function TapEmptyController() {
  angular
      .module('tap')
      .controller('TapEmptyController', ['$scope', '$location', '$log', 'socketFactory',
        function TapEmptyControllerCallback($scope, $location, $log, socketFactory) {
          var vm = this;

          /**
           * Moves to the sweep page.
           */
          vm.goToTapPage = function goToTapPage() {
            var sPath = '/tap';
            $location.path(sPath);
          };

          /**
           * Socket function that wraps the goToTapPage function,
           * run on receiving 'goToTapPage' message.
           */
          socketFactory.on('tap_set', function GoToTap() {
            $log.log('goToTapPage call received from /empty');
            $scope.$apply(function GoToTapApply() {
              vm.goToTapPage();
            });
          });
        }]);
})());

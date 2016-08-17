/**
 * Controller for tapping events.
 * by Daniel Suh 7/28/2016
 */
((function TapController() {
  angular
      .module('tap')
      .controller('TapController', ['$scope', 'socketFactory', '$location', '$log',
        function TapControllerCallback($scope, socketFactory, $location, $log) {
          var vm = this;
          vm.logoUrl = '../../assets/images/kisweLogo.png'; // cute Kiswe logo - not used
          vm.punchImage1 = '../../assets/images/punch_grey.png'; // left
          vm.punchImage2 = '../../assets/images/punch_red.png'; // right
          vm.toggleImage = '../../assets/images/graph_button.png'; // toggle button
          vm.fighterCount1 = 0; // left punch count
          vm.fighterCount2 = 0; // right punch count
          vm.graphOn = false;

          /**
           * Toggles the graph button.
           */
          vm.showGraph = function showGraph() {
            vm.graphOn = !vm.graphOn;
          };

          /**
           * Increment per tap the punch count for each fighter.
           * @param num the fighter number.
           */
          vm.increaseFighterPunchCount = function increaseFighterPunchCount(num) {
            if (num === 1) {
              vm.fighterCount1++;
            } else if (num === 2) {
              vm.fighterCount2++;
            }
            vm.storePunchCount(vm.fighterCount1, vm.fighterCount2);
          };

          /**
           * CURRENTLY NOT USED
           * Moves the balance bar by AMOUNT. This calls the 'addPowerBalance' function
           * in power bar controller of the resting page through socket.
           * @param amount the amount to change the balance bar
           */
          vm.moveBalanceBar = function moveBalanceBar(amount) {
            $log('moveBalanceBar emit : ' + amount);
            socketFactory.emit('addPowerBalance', { amount: amount });
          };

          /**
           * Adds the current user's punch count to the database.
           * @param count1 left punch count
           * @param count2 right punch count
           */
          vm.storePunchCount = function storePunchCount(count1, count2) {
            $log('storePunchCount called on controller');
            socketFactory.storePunchCount(count1, count2);
          };

          /**
           * Moves to the empty page.
           */
          vm.goToEmptyPage = function goToEmptyPage() {
            $location.path('/empty');
          };

          /**
           * Socket function that wraps the goToEmptyPage function,
           * run on receiving 'goToEmptyPage' message.
           */
          socketFactory.on('tap_set_empty', function goToEmptyOn() {
            $log.log('goToPunchEmpty call received - sweep');
            $scope.$apply(function goToEmptyApply() {
              vm.goToEmptyPage();
            });
          });
        }]);
})());

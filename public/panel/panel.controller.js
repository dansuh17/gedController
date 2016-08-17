(function () {
  angular.module('panelApp').controller('PanelController',
      ['$scope', '$log', 'panelFactory', function ($scope, $log, panelFactory) {
        var vm = this;

        vm.timer_start = function () {
          $log.log('timer start');
          panelFactory.timer_start();
        };

        vm.timer_stop = function () {
          $log.log('timer stop');
          panelFactory.timer_stop();
        };

        vm.timer_reset = function () {
          $log.log('timer reset');
          panelFactory.timer_reset();
        };

        vm.set_round = function (roundNo) {
          $log.log('set round number to ' + roundNo);
          panelFactory.set_round(roundNo);
        };

        vm.countdownInput = 0;
        vm.set_countdown = function (countdownInput) {
          $log.log('set countdown to s' + countdownInput + '(s).');
          panelFactory.set_countdown(countdownInput);
        };

        vm.fighter1 = 0;
        vm.fighter2 = 0;
        vm.votes_set = function (fighter1, fighter2) {
          $log.log('set votes to : ' + fighter1 + ', ' + fighter2);
          panelFactory.votes_set(fighter1, fighter2);
        };

        vm.punch_set = function (punch1, punch2) {
          $log.log('set punch counts to ' + punch1.toString(), punch2.toString());
          panelFactory.punch_set(punch1, punch2);
        };

        vm.sweep_set_empty = function () {
          $log.log('sweep set empty');
          panelFactory.sweep_set_empty();
        };

        vm.sweep_set = function (page) {
          $log.log('sweep set page : ' + page);
          panelFactory.sweep_set(page);
        };

        vm.tap_set_empty = function () {
          $log.log('set punch count empty');
          panelFactory.tap_set_empty();
        };

        vm.tap_set = function () {
          $log.log('set punch tap');
          panelFactory.tap_set();
        };

        vm.vganchor_set_empty = function () {
          $log.log('set ganchor empty');
          panelFactory.vganchor_set_empty();
        };

        vm.vganchor_set = function () {
          $log.log('set ganchor tap');
          panelFactory.vganchor_set();
        };
      }]);
})();

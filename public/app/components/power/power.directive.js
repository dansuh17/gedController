/**
 * Angular Directive for the progress bar
 */
;(function() {
  angular
      .module('gedApp')
      .directive('powerBalance', function () {
        return {
          restrict: 'EA',
          templateUrl: 'app/components/power/power.html'
        }
      });
})();

/**
 * Controller for empty page. Listens to a socket message indicating which sweep page to go.
 * by Daniel Suh 8/16/2016
 */
;(function() {
  angular
      .module('tap')
      .controller('tapEmptyCtrl', ['$scope', '$location', '$anchorScroll', 'socketFactory',
        function ($scope, $location, $anchorScroll, socketFactory) {
        }]);
})();

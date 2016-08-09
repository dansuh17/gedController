;(function() {
  angular
      .module('sweep')
      .controller('sweepEmptyCtrl', ['$scope', '$location', '$anchorScroll',
        function ($scope, $location, $anchorScroll) {
          console.log("empty controller loaded");
        }]);
})();

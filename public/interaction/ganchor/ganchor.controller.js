/**
 * Created by deNsuh on 8/9/16.
 */
;(function() {
  angular
      .module('ganchor')
      .controller('ganchorCtrl', ['$scope', function($scope) {
        $scope.anchor_button = "../path/to/image.png";
      }]);
})();

;(function() {
    angular.module('panelApp').controller('panelController', ['$scope', 'panelFactory', function($scope, panelFactory){
        $scope.timer_start= function () {
            console.log("timer start");
            panelFactory.timer_start();
        }
    }]);
})();

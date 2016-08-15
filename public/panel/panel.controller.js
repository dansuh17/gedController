;(function() {
    angular.module('panelApp').controller('panelController', ['$scope', 'panelFactory', function($scope, panelFactory){
        $scope.timer_start= function () {
            console.log("timer start");
            panelFactory.timer_start();
        }

        $scope.timer_stop= function () {
            console.log("timer stop");
            panelFactory.timer_stop();
        }

        $scope.timer_reset= function () {
            console.log("timer reset");
            panelFactory.timer_reset();
        }

        $scope.set_round= function (roundNo) {
            console.log("set round number to " + roundNo);
            panelFactory.set_round(roundNo);
        }

        $scope.countdownInput = 0;
        $scope.set_countdown= function (countdownInput) {
            console.log("set countdown to " + countdownInput + "(s).");
            panelFactory.set_countdown(countdownInput);
        }
    }]);
})();

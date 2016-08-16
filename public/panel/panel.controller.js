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


        $scope.devinUp= 0;
        $scope.tomUp= 0;
        $scope.votes_set= function (devinUp, tomUp) {
            console.log("set votes to " + devinUp.toString() + ", " + tomUp.toString());
            panelFactory.votes_set(devinUp, tomUp);
        }


        $scope.sweep_set_empty= function () {
            console.log("sweep set empty");
            panelFactory.sweep_set_empty();
        }

        $scope.sweep_set_page= function (pageNum) {
            console.log("sweep set page : " + pageNum.toString());
            panelFactory.sweep_set_page(pageNum);
        }




        $scope.punch_set = function(punch1, punch2) {
            console.log("set punch counts to " + punch1.toString(), punch2.toString());
            panelFactory.punch_set(punch1, punch2);
        }

    }]);
})();

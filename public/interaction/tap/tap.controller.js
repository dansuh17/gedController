/**
 * Controller for tapping events.
 * by Daniel Suh 7/28/2016
 */
;(function() {
  angular
      .module('tap')
      .controller('tapCtrl', ['$scope', '$http', 'socketFactory',
        function ($scope, $http, socketFactory) {
          // cute kiswe logo
          $scope.logoUrl = '../../assets/images/kisweLogo.png';
          $scope.punchImage1 = '../../assets/images/punch_grey.png'; // left
          $scope.punchImage2 = '../../assets/images/punch_red.png'; // right
          $scope.toggleImage = '../../assets/images/graph_button.png'; // toggle button

          $scope.fighterCount1 = 0;
          $scope.fighterCount2 = 0;

          $scope.graphOn = false;

          $scope.showGraph = function() {
            $scope.graphOn = !$scope.graphOn;
          };

          /**
           * Increment per tap the punch count for each fighter.
           * @param num the fighter number.
           */
          $scope.increaseFighterPunchCount = function(num) {
            if (num == 1) {
              $scope.fighterCount1++;
            } else if (num == 2) {
              $scope.fighterCount2++;
            }
            $scope.storePunchCount($scope.fighterCount1, $scope.fighterCount2);
          };

          /**
           * CURRENTLY NOT USED
           * Moves the balance bar by AMOUNT. This calls the 'addPowerBalance' function
           * in power bar controller of the resting page through socket.
           * @param amount the amount to change the balance bar
           */
          $scope.moveBalanceBar = function(amount) {
            console.log('moveBalanceBar emit : ' + amount);
            socketFactory.emit('addPowerBalance', {amount: amount});
          };

          /**
           * Stores the current punch count to the server.
           * @param count1 left punch count
           * @param count2 right punch count
           */
          $scope.storePunchCount = function(count1, count2) {
            var prev1;
            var prev2;

            $http.get('http://ged.uwcj.kr/punch/').then(function(response) {
              prev1 = response.data.fighter1;
              prev2 = response.data.fighter2;

              var data = JSON.stringify({fighter1: count1 + prev1, fighter2: count2 + prev2});
              console.log('storePunchCount emit : ', + count1 + ', ' + count2);

              $http.post('http://ged.uwcj.kr/punch/', data).then(function(response) {
                console.log("punch count successfully stored");
              });
            });
          }
      }]);
})();

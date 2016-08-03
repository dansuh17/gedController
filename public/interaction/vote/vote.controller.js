/**
 * Controller for voting page that will be overlayed onto the main broadcast stream
 * in which the user may tap onto the screen (except for the PiP area) to toggle
 * a vote to switch between different champions.
 * The user's voting status will be aggregated into a separate 'rest page' that shows
 * graphically the ratio and amount of votes casted on each fighter.
 * by Daniel Suh 8/2/2016
 */
;(function() {
  angular
      .module('vote')
      .controller('voteCtrl', ['$scope', '$timeout', 'socketFactory', function ($scope, $timeout, socketFactory) {
        // cute kiswe logo
        $scope.logoUrl = '../../assets/images/kisweLogo.png';
        $scope.currentVotePic = '../../assets/images/vote1.png';
        $scope.status = 0; // status of the vote

        /**
         * Toggles votes. Status 0 means that the user has just entered the voting system
         * having the default value.
         */
        $scope.switchVote = function() {
          console.log('switchVote toggled');
          switch($scope.status) {
            case 0:
              $scope.status = 1;
              break;
            case 1:
              $scope.status = -1;
              break;
            case -1:
              $scope.status = 1;
              break;
            default:
              break;
          }
          $scope.changePictureUrl($scope.status);
        };

        // change the picture Url for the current supporting champion
        $scope.changePictureUrl = function(status) {
          switch(status) {
            case 0:
              $scope.currentVotePic = '../../assets/images/vote0.png';
              break;
            case 1:
              $scope.currentVotePic = '../../assets/images/vote1.png';
              break;
            case -1:
              $scope.currentVotePic = '../../assets/images/vote2.png';
              break;
            default:
              break;
          }
        };
      }]);
})();

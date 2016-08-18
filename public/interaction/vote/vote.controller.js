/**
 * Controller for voting page that will be overlayed onto the main broadcast stream
 * in which the user may tap onto the screen (except for the PiP area) to toggle
 * a vote to switch between different champions.
 *
 * The user's voting status will be aggregated into a separate 'rest page' that shows
 * graphically the ratio and amount of votes casted on each fighter.
 * by Daniel Suh 8/2/2016
 */
(function () {
  angular
      .module('vote')
      .controller('VoteController', ['$scope', '$timeout', '$log', 'socketFactory',
        function ($scope, $timeout, $log, socketFactory) {
          var vm = this;
          // status of the vote - 0 : default (no vote yet cast) 1 > voted for according player
          vm.currentVotePic = '../../assets/images/vote0.png'; // default image
          vm.status = 0;

          /**
           * Toggles votes. Status 0 means that the user has just entered the voting system
           * having the default value.
           * Also alerts the server that the toggle has been changed.
           */
          vm.switchVote = function () {
            var currentStatus = vm.status;
            switch (vm.status) {
              case 0:
                vm.status = 1;
                break;
              case 1:
                vm.status = 2;
                break;
              case 2:
                vm.status = 1;
                break;
              default:
                break;
            }

            vm.changePictureUrl(vm.status);
            socketFactory.emit('giveVoteStatus', { status: vm.status, prevStatus: currentStatus });
          };

          /**
           * Changes the picture url according to current status.
           * @param status current vote status
           */
          vm.changePictureUrl = function (status) {
            switch (status) {
              case 0:
                vm.currentVotePic = '../../assets/images/vote0.png';
                break;
              case 1:
                vm.currentVotePic = '../../assets/images/vote1.png';
                break;
              case 2:
                vm.currentVotePic = '../../assets/images/vote2.png';
                break;
              default:
                break;
            }
          };

          /**
           * On request to receive the vote toggle status,
           * it responds with the vote status.
           */
          socketFactory.on('getVoteStatus', function () {
            $log.log('getVoteStatus received');
            socketFactory.emit('giveVoteStatus', vm.status);
          });
        }]);
})();

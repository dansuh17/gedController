/**
 * A controller for twitter feed which shows a twitter having a certain tag (defined in socket.js)
 * for a certain time over the rest page.
 */
(function() {
  angular
      .module('gedApp')
      .controller('TwitController', ['$scope', '$timeout', '$interval', 'socket',
        function ($scope, $timeout, $interval, socket) {
          var vm = this;
          var intervalCall;

          vm.feedList = []; // each feed is stored here
          vm.tweet = vm.feedList[0];

          /**
           * Updates twitter feed and displays on screen.
           */
          var updateFeed = function () {
            if (vm.feedList.length !== 0) {
              vm.feedList.shift();
              vm.tweet = vm.feedList[0];
            }

            if (vm.feedList.length === 0) {
              $interval.cancel(intervalCall);
            }
          };

          // upon receiving a twitter feed, then show the feed for 5 secs
          socket.on('stream', function (tweet) {
            console.log('twitter feed received.');
            $scope.$apply(function () {
              if (vm.feedList.length < 5) {
                vm.feedList.push(tweet);
              }

              if (vm.feedList.length === 1) {
                intervalCall = $interval(updateFeed, 5000);
                vm.tweet = vm.feedList[0];
              }
            });
          });
        }]);
})();

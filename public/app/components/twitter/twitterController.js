/**
 * A controller for twitter feed which shows a twitter having a certain tag (defined in socket.js)
 * for a certain time over the rest page.
 */
(function() {
  angular
      .module('gedApp')
      .controller('TwitController', ['$scope', '$timeout', '$interval', 'socket',
        function ($scope, $timeout, $interval, socket) {
          // each feed is stored here
          $scope.feedList = [];
          $scope.tweet = $scope.feedList[0];
          var intervalCall;

          /**
           * Updates twitter feed and displays on screen.
           */
          var updateFeed = function () {
            if ($scope.feedList.length !== 0) {
              $scope.feedList.shift();
              $scope.tweet = $scope.feedList[0];
            }

            if ($scope.feedList.length === 0) {
              $interval.cancel(intervalCall);
            }
          };

          // upon receiving a twitter feed, then show the feed for 5 secs
          socket.on('stream', function (tweet) {
            console.log('twitter feed received.');
            $scope.$apply(function () {
              if ($scope.feedList.length < 5) {
                $scope.feedList.push(tweet);
              }

              if ($scope.feedList.length === 1) {
                intervalCall = $interval(updateFeed, 5000);
                $scope.tweet = $scope.feedList[0];
              }
            });
          });
        }]);
})();

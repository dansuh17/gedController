app.controller('twitCtrl', ['$scope', '$timeout', '$interval', 'socket', function($scope, $timeout, $interval, socket) {
    $scope.feedList = [];
    $scope.tweet = $scope.feedList[0];
    console.log($scope.feedList.length);
    var intervalCall;

  /**
   * Updates twitter feed and displays on screen.
   */
  var updateFeed = function() {
        if ($scope.feedList.length!=0) {
            $scope.feedList.shift();
            $scope.tweet = $scope.feedList[0];
        }

        if ($scope.feedList.length==0) {
            $interval.cancel(intervalCall);
        }
    };

    socket.on("stream", function(tweet){
        console.log("twitter feed received.");
        $scope.$apply(function() {
            if ($scope.feedList.length<5) {
                $scope.feedList.push(tweet);
            }

            if ($scope.feedList.length == 1) {
                intervalCall = $interval(updateFeed, 5000);
                $scope.tweet = $scope.feedList[0];
            }
        });
    });
}]);

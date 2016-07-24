app.controller('twitCtrl', ['$scope', 'socket', function($scope, socket) {
    $scope.feedList = [];
    $scope.tweet = $scope.feedList[0];
    console.log($scope.feedList.length);
    socket.on("stream", function(tweet){
        console.log("twitter feed received.");
        console.log(tweet);
        //insert tweet into $scope.feedList.
        $scope.$apply(function() {
            $scope.feedList.push(tweet);
            $scope.tweet = $scope.feedList[0];
        });
        console.log("feedList has " + $scope.feedList.length + " elements.");
    });

    // when the feedList is not empty, ng-show.
    // At 5 seconds timeout, pop.
    // At timeout, ng-hide and then give breakf or 0.5 second.
    // possibly length-dependent timeout?
    /*
    tweet = {
        text,
        icon,
        name,
        username,
        hash
    };
     */


}]);

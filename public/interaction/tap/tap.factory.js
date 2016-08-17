/**
 * Binds the socket and exposes socket.on and socket.emit functions.
 * by Daniel Suh, 8/16/2016
 */
;(function() {
  angular
      .module('tap')
      .factory('socketFactory', ['$http', function($http) {
        var socket = io.connect();

        return {
          on: function(eventName, callback){
            socket.on(eventName, callback);
          },
          emit: function(eventName, data) {
            socket.emit(eventName, data);
          },

          /**
           * Stores the current punch count to the server.
           * @param count1 left punch count
           * @param count2 right punch count
           */
          storePunchCount: function(count1, count2) {
            var prev1;
            var prev2;

            $http.get('/punch/').then(function(response) {
              prev1 = response.data.fighter1;
              prev2 = response.data.fighter2;

              var data = JSON.stringify({fighter1: count1 + prev1, fighter2: count2 + prev2});
              console.log('storePunchCount emit : ', + count1 + ', ' + count2);

              $http.post('/punch/', { fighter1: count1, fighter2: count2 }).then(function(response) {
                console.log("punch count successfully stored");
              });
            });
          }
        };
      }]);
})();


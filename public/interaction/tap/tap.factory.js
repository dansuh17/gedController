/**
 * Binds the socket and exposes socket.on and socket.emit functions.
 * by Daniel Suh, 8/16/2016
 */
/* global io:true */
((function TapSocketFactory() {
  angular
      .module('tap')
      .factory('socketFactory', ['$http', '$log',
        function socketFactoryCallback($http, $log) {
          var socket = io.connect();

          return {
            on: function socketOn(eventName, callback) {
              socket.on(eventName, callback);
            },
            emit: function socketEmit(eventName, data) {
              socket.emit(eventName, data);
            },

            /**
             * Stores the current punch count to the server.
             * @param count1 left punch count
             * @param count2 right punch count
             */
            storePunchCount: function storePunchCount(count1, count2) {
              var prev1;
              var prev2;

              $http.get('/punch/').then(function httpGetCallback(response) {
                prev1 = response.data.fighter1 + count1;
                prev2 = response.data.fighter2 + count2;

                $http.post('/punch/' + prev1 + '/' + prev2, {}).then(
                    function postCallback() {
                      $log('punch count successfully stored : ' + count1 + ', ' + count2);
                    }
                );
              });
            }
          };
        }]);
})());


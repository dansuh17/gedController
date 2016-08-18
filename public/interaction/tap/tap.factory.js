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
              $http.post('/punch/incr', { accum1: count1, accum2: count2 })
                  .then(function () {
                    $log.log('punch count successfully stored : ' + count1 + ', ' + count2);
                  });
            }
          };
        }]);
})());


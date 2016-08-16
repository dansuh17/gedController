/**
 * Binds the socket and exposes socket.on and socket.emit functions.
 * by Daniel Suh, 8/16/2016
 */
;(function() {
  angular
      .module('tap')
      .factory('socketFactory', [function() {
        var socket = io.connect();

        return {
          on: function(eventName, callback){
            socket.on(eventName, callback);
          },
          emit: function(eventName, data) {
            socket.emit(eventName, data);
          }
        };
      }]);
})();


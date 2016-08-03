/**
 * Binds the socket and exposes socket.on and socket.emit functions.
 */
;(function() {
  angular
      .module('tap',[])
      .factory('socketFactory', ['$rootScope', function($rootScope) {
        var socket = io.connect();
        console.log('connected to tap factory');

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


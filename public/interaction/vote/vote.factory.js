/**
 * binds the socket and exposes socket.on and socket.emit functions.
 * by daniel suh 8/2/2016
 */
;(function() {
  angular
      .module('vote',[])
      .factory('socketFactory', ['$rootscope', function($rootscope) {
        var socket = io.connect();
        console.log('connected to tap factory');

        return {
          on: function(eventname, callback) {
            socket.on(eventname, callback);
          },
          emit: function(eventname, data) {
            socket.emit(eventname, data);
          }
        };
      }]);
})();

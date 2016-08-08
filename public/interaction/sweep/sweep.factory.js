/**
 * binds the socket and exposes socket.on and socket.emit functions.
 * by daniel suh 8/8/2016
 */
;(function() {
  angular
      .module('sweep',[])
      .factory('socketFactory', ['$rootscope', function($rootscope) {
        var socket = io.connect();

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

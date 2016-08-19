/**
 * Binds the socket and exposes socket.on and socket.emit functions.
 * by Daniel Suh 8/2/2016
 */
(function () {
  angular
      .module('vote')
      .factory('socketFactory', [function () {
        var socket = io.connect();

        // check in to the db
        socket.emit('giveVoteStatus', 0);

        return {
          on: function (eventname, callback) {
            socket.on(eventname, callback);
          },
          emit: function (eventname, data) {
            socket.emit(eventname, data);
          }
        };
      }]);
})();

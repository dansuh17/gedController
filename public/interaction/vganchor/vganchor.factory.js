/**
 * Binds the socket and exposes socket.on and socket.emit functions
 * for vganchor module
 * by Daniel Suh 8/2/2016
 */
((function vganchorFactory() {
  angular
      .module('vganchor')
      .factory('socketFactory', [function () {
        const socket = io.connect();

        // check in to the db
        socket.emit('giveVoteStatus', 0);

        return {
          on: function vganchorSocketOn(eventname, callback) {
            socket.on(eventname, callback);
          },
          emit: function vganchorSocketOn(eventname, data) {
            socket.emit(eventname, data);
          },
        };
      }]);
})());

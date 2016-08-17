/**
 * Binds the socket and exposes socket.on and socket.emit functions.
 * by daniel suh 8/8/2016
 */
/* global io:true */
((function sweepSocketFactory() {
  angular
      .module('sweep')
      .factory('socketFactory', [function sweepFactoryCallback() {
        var socket = io.connect();

        return {
          on: function socketOnCallback(eventname, callback) {
            socket.on(eventname, callback);
          },
          emit: function socketEmitCallback(eventname, data) {
            socket.emit(eventname, data);
          }
        };
      }]);
})());

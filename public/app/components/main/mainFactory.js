app.factory('socket', ['$rootScope', function($rootScope) {
    var socket = io.connect();
    console.log('mainFactory');

    return {
        on: function(eventName, callback){
            socket.on(eventName, callback);
        },
        emit: function(eventName, data) {
            socket.emit(eventName, data);
        }
    };
}]);

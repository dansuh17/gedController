/**
 * Created by deNsuh on 7/20/16.
 */
app.factory('socket', function ($rootScope) {
  var socket = io.connect();

  return {
    on: function('tomEnergyDec', function (data) {
    $scope.tomEnergyMinusFive();
    });
  }
});

app.factory('socket', function ($rootScope) {
  var socket = io.connect();
  return {
    on: function (eventName, callback) {
      socket.on(eventName, function () {
        var args = arguments;
        $rootScope.$apply(function () {
          callback.apply(socket, args);
        });
      });
    },
    emit: function (eventName, data, callback) {
      socket.emit(eventName, data, function () {
        var args = arguments;
        $rootScope.$apply(function () {
          if (callback) {
            callback.apply(socket, args);
          }
        });
      })
    }
  };
});


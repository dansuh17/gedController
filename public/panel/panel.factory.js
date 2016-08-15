
;(function() {
    angular.module('panelApp')
        .factory('panelFactory', ['$http', function($http) {
            return {
                timer_start: function() {
                    return $http.post('/timer/start').success(function(data) {
                    });
                },

                timer_stop: function() {
                    return $http.post('/timer/stop').success(function(data) {
                    });
                },

                timer_reset: function() {
                    return $http.post('/timer/reset').success(function(data) {
                    });
                },

                set_round: function(roundNo) {
                    return $http.post('/timer/setRoundNo/' + roundNo.toString(), {}).success(function(data) {
                    });
                },

                set_countdown: function(countdownInput) {
                    return $http.post('/timer/setCount/' + countdownInput.toString(), {}).success(function(data) {
                    });
                }
            };
        }]);
})();
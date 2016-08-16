
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
                },

                votes_set: function(devinUp, tomUp) {
                    return $http.post('/votes/set/' + devinUp.toString() + '/' + tomUp.toString(), {}).success(function(data) {
                    });
                },

                sweep_set_empty: function() {
                    return $http.post('/sweep/setEmpty/', {}).success(function(data) {
                    });
                },

                sweep_set_page: function(pageNum) {
                    return $http.post('/sweep/setSweep/' + pageNum.toString(), {}).success(function(data) {
                    });
                },

                punch_set: function(punch1, punch2) {
                    return $http.post('/punch/' + punch1.toString() + '/' + punch2.toString(), {});
                },

                punch_set_empty: function() {
                    return $http.post('/punch/setPunchEmpty/');
                },

                punch_set_tap: function() {
                    return $http.post('/punch/setTap/');
                },

                ganchor_set_empty: function() {
                    return $http.post('/votes/setGanchorEmpty/');
                },

                ganchor_set_tap: function() {
                    return $http.post('/votes/setGanchor/');
                }
            };
        }]);
})();

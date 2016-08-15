
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
                }
            };
        }]);
})();
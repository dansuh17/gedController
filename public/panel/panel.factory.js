
(function() {
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

          set_round: function (roundNo) {
            return $http.post('/timer/roundNo/', { roundNo: roundNo });
          },

          set_countdown: function (countdown) {
            return $http.post('/timer/countdown/', { countdown: countdown });
          },


          /* DB access */
          votes_set: function (fighter1, fighter2) {
            return $http.post('/votes/', { fighter1: fighter1, fighter2: fighter2 });
          },

          punch_set: function (fighter1, fighter2) {
            return $http.post('/punch/', { fighter1: fighter1, fighter2: fighter2 });
          },


          /* sweep page */
          sweep_set_empty: function () {
            return $http.post('/overlay/setEmpty/', {});
          },

          sweep_set_page: function (pageNum) {
            return $http.post('/overlay/setSweep/', { pageNum: pageNum });
          },


          /* tap/punch page */
          punch_set_empty: function () {
            return $http.post('/overlay/setPunchEmpty/');
          },

          punch_set_tap: function () {
            return $http.post('/overlay/setTap/');
          },


          /* vganchor page */
          ganchor_set_empty: function () {
            return $http.post('/overlay/setGanchorEmpty/');
          },

          ganchor_set_tap: function () {
            return $http.post('/overlay/setGanchor/');
          }
        };
      }]);
})();

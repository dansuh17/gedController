
(function () {
  angular.module('panelApp')
      .factory('panelFactory', ['$http', function ($http) {
        return {
          timer_start: function () {
            return $http.post('/timer/start/');
          },

          timer_stop: function () {
            return $http.post('/timer/stop/');
          },

          timer_reset: function () {
            return $http.post('/timer/reset/');
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
            return $http.post('/overlay/sweep/', { page: 'empty' });
          },

          sweep_set: function (page) {
            return $http.post('/overlay/sweep/', { page: page });
          },


          /* tap/punch page */
          tap_set_empty: function () {
            return $http.post('/overlay/tap/', { page: 'empty' });
          },

          tap_set: function () {
            return $http.post('/overlay/tap/', { page: 'on' });
          },


          /* vganchor page */
          vganchor_set_empty: function () {
            return $http.post('/overlay/vganchor/', { page: 'empty' });
          },

          vganchor_set: function () {
            return $http.post('/overlay/vganchor/', { page: 'on' });
          }
        };
      }]);
})();

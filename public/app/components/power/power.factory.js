(function () {
  angular.module('gedApp')
      .factory('powerFactory', ['$http', function ($http) {
        return {

          votes_get: function () {
            return $http.get('/votes/');
          },

        };
      }]);
})();

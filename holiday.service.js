(function() {
    angular.module('App.service', []).service('holidayService', function($http) {
        this.getHolidaysByYear = function(c, y) {
            var root = 'https://holidayapi.com/v1/holidays';
            var apiKey = '034ea25e-cce5-46a7-b506-7233c30437e7';
            return $http.get(root + '?country=' + c + '&year=' + y + '&key=' + apiKey);
        }
    })
})();
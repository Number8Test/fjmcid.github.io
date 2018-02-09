(function() {
    angular.module('App', []).controller('CalendarController', CalendarController);

    function CalendarController() {
        var c = this;
        c.startDate = new Date(2017, 4, 1);
        c.days = 5;
        c.countryCode = 'US';
        c.dates = [];
        c.holidays = [];

        c.onChange = function() {

        }

        function UpdateCalendar() {};

    }

});
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

        };

        function UpdateCalendar() {};

        function GetHolidays() {
            var date = new Date();
            var getData = holidayService.getHolidaysByYear(c.countryCode, c.startDate.getFullYear());
            getData.then(function(holidays) {
                c.holidays = holidays.data.holidays;
            }, function() {
                alert('Error retrieving the holidays');
            });
        };
        GetHolidays();
    }

})();
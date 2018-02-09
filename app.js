(function() {
    angular.module('App', ['App.service']).controller('CalendarController', CalendarController);

    function CalendarController(holidayService) {
        var c = this;
        c.startDate = new Date(2017, 4, 1);
        c.days = 5;
        c.year = c.startDate.getFullYear();
        c.countryCode = 'US';
        c.dates = [];
        c.holidays = [];

        c.onChange = function() {
            UpdateCalendar();
        };

        function UpdateCalendar() {
            c.dates = [];
            c.endDate = c.startDate;
            var daysProcessed = 0;
            var startingMonth = date.getMonth();
            var numberOfMonths = 0;
            for (m = 0; m <= numberOfMonths; m++) {
                c.currentMonth = date.GetMonth;
                var formatter = new Intl.DateTimeFormat(c.countryCode, { month: 'long' });
                var monthName = formatter.format(date);

                var month = {
                    'monthName': monthName,
                    'weeks': []
                };
                c.dates.push(month);
            }

        };

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
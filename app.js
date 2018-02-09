(function() {
    angular.module('App', ['App.service']).controller('CalendarController', CalendarController);

    function CalendarController(holidayService) {
        var c = this;


        function addDays(date, days) {
            var newDate = new Date(date.getTime() + (days * 24 * 60 * 60 * 1000));
            return newDate;
        }

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
            c.endDate = addDays(c.startDate, c.days);
            var numberOfMonths = c.endDate.getMonth() - c.startDate.getMonth();
            var daysProcessed = 0;
            var date = c.startDate;
            var startingMonth = date.getMonth();
            for (m = 0; m <= numberOfMonths; m++) {
                c.currentMonth = date.getMonth();
                var formatter = new Intl.DateTimeFormat(c.countryCode, { month: 'long' });
                var monthName = formatter.format(date);
                c.today = date.getDate();

                var daysInMonth = getDaysInMonth(c.currentMonth + 1, c.year);
                var numberOfWeeks = Math.floor((daysInMonth + c.startDate.getDay()) / 7) + 1;

                var weeks = [];
                daysNumber = 1;

                for (i = 0; i < numberOfWeeks; i++) {
                    weeks[i] = [];
                    for (j = 0; j < 7; j++) {
                        weeks[i][j] = { 'number': '', 'description': '', 'holiday': false };
                        if (i == 0 && j < 1) {
                            //first week, normally incomplete
                        } else {
                            if (daysNumber <= daysInMonth) {
                                weeks[i][j].number = daysNumber;
                                weeks[i][j].description = 'Normal Day';
                                daysProcessed++
                            }
                            daysNumber++;
                        }
                    }
                    date = new Date(c.year, c.currentMonth + 1, 1);
                }

                var month = {
                    'monthName': monthName,
                    'weeks': weeks
                };
                c.dates.push(month);
            }

        };

        function getDaysInMonth(month, year) {
            return new Date(year, month, 0).getDate();
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
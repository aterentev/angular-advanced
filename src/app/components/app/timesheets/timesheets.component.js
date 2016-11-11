import template from './timesheets.tpl.html'
import styles from './timesheets.css'
import angular from 'angular'

class Controller {
  /** @ngInject */
  constructor($q, $location, $document, utils, tableConstruct) {
    var vm = this,
      date = new Date(2016, 8, 12);

    // console.log('timesheets ', vm.user);
    vm.$document = $document;

    vm.calendar = [];
    vm.timesheets = [];
    vm.styles = styles;

    vm.nextWeek = nextWeek;
    vm.prevWeek = prevWeek;

    createCalendar(date);
    // vm.$document.ready(function() {
      /*tableConstruct.fillTimesheets(vm.user, vm.calendar);
      tableConstruct.countTotal('.total-cell');*/
      vm.fillTimesheets(vm.user, vm.calendar);
      vm.countTotal('.total-cell');
    // });

    function createCalendar(date) {
      for (var i = 0; i < 7; i++) {
        vm.calendar.push(getDateChange(date, i));
      }
    }

    function getDateChange(date, days) {
      var dateCopy = new Date(date);

      dateCopy.setDate(date.getDate() + days);
      return dateCopy
    }

    function nextWeek() {
      date = getDateChange(date, 7);

      vm.calendar = [];
      createCalendar(date);
      vm.fillTimesheets(vm.user, vm.calendar);
      vm.countTotal('.total-cell');
    }

    function prevWeek() {
      date = getDateChange(date, -7);

      vm.calendar = [];
      createCalendar(date);
      vm.fillTimesheets(vm.user, vm.calendar);
      vm.countTotal('.total-cell');
    }
  }

  fillTimesheets(user) {
    var vm = this;

    vm.$document.ready(function() {
      user.Projects.forEach(function (project) {
        project.Tickets.forEach(function (ticket) {
          ticket.TimeSheets.forEach(function (timesheet) {
            var date = new Date(timesheet.Date),
              timesheetSelector = document.getElementById(ticket.Name + '_' + date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate()),
              timesheetElement = angular.element(timesheetSelector);

            $(timesheetElement).val(timesheet.LoggedTime);
          })
        });
      });
    })
  }

  countTotal(selector) {
    var vm = this;

    vm.$document.ready(function() {
      $(selector).each(function () {
        var total = 0,
          column = $(this).siblings(selector).addBack().index(this);
        $(this).parents().prevUntil(':has(' + selector + ')').each(function () {
          total += parseFloat($('.timesheets-cell:eq(' + column + ') > input', this).val()) || 0;
        });
        $(this).html(total);
      });
    })
  }
}

export default {
  template,
  controller: Controller,
  bindings: {
    user: '<'
  }
};

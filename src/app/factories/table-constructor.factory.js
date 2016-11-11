export default tableConstruct;

tableConstruct.$inject = ['$http', '$q', '$document', '$compile', 'localStorageService', 'utils'];

function tableConstruct($http, $q, $document, $compile, localStorageService, utils) {
  return {
    render: function() {
      var vm = this,
        date = new Date();

      // vm.calendar = [];
      //
      // vm.createTable = createTable;
      //
      // for (var i = 0; i < 7; i++) {
      //   vm.calendar.push(getDateNext(date, i));
      // }
      //
      // // console.log(vm.calendar);
      //
      // function getDateNext(date, days) {
      //   var dateCopy = new Date(date);
      //
      //   dateCopy.setDate(date.getDate() + days);
      //   return dateCopy.toDateString();
      // }
      //
      // function createTable() {
      //   var rows = $('.timesheets-table-content > tr');
      //
      //   rows.forEach(function(row) {
      //     console.log(row);
      //   })
      // }
    }

    /*fillTimesheets: function(user) {
      $document.ready(function() {
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
    },

    countTotal: function(selector) {
      $document.ready(function() {
        $(selector).each(function () {
          var total = 0,
            column = $(this).siblings(selector).addBack().index(this);
          $(this).parents().prevUntil(':has(' + selector + ')').each(function () {
            total += parseFloat($('.timesheets-cell:eq(' + column + ') > input', this).val()) || 0;
          });
          $(this).html(total);
        });
      });
    },*/

    /*dashboardCreate: function(task, scope) {
      var html = "<ticket ticket='$ctrl.task'></ticket>",
        template = angular.element(html),
        linkFn = $compile(template),
        element = linkFn(scope);
      //
      // console.log(element);

      $document.ready(function() {
        $('#' + task.Id + ' .column').each(function() {
          if ($(this).hasClass(task.Status.Name)) {
            $(this).html(element);
          }
        })
      });
    }*/
    /*dashboardCreate: function(tasks, scope) {
      tasks.forEach(function(task) {
        var html = "<ticket ticket='$ctrl.task" + task.Id + "'></ticket>",
          template = angular.element(html),
          linkFn = $compile(template),
          element = linkFn(scope);

        $document.ready(function () {
          $('#' + task.Id + ' .column').each(function() {
            // console.log(element);
            // // $(this).html(element);
            this.innerHTML = $(element).html();
            //
            var ticket = $(this).find('.ticket')[0];

            $(ticket).addClass('hidden');
            if ($(this).hasClass(task.Status.Name)) {
              // $(this).html(element);
              // this.innerHTML = $(element).html();
              $(ticket).removeClass('hidden');
            }
          })
        });
      })
    }*/
  }
}

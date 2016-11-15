import template from './dashboard.tpl.html'
import styles from './dashboard.css'
import angular from 'angular'

class Controller {
  /** @ngInject */
  constructor($scope, $compile, $document, DnD, tableConstruct) {
    var vm = this;

    vm.scope = $scope;
    vm.DnD = DnD;
    vm.tableConstruct = tableConstruct;
    vm.compile = $compile;
    vm.document = $document;

    vm.tasks = vm.tasks.data;

    vm.tasks.forEach(function(task) {
      vm['task' + task.Id] = task;
      vm['task' + task.Id].moved = false;
    });

    vm.dashboardCreate();
    vm.init();
  }

  $onInit() {
    var vm = this;

    vm.styles = styles;
  }

  dashboardCreate() {
    var vm = this;

    vm.tasks.forEach(function(task) {
      var html = "<ticket tickets='$ctrl.tasks' ticket='$ctrl.task" + task.Id + "'></ticket>",
        template = angular.element(html),
        linkFn = vm.compile(template),
        element = linkFn(vm.scope);

      vm.document.ready(function () {
        $('#' + task.Id + ' .column').each(function() {
          if ($(this).hasClass(task.Status.Name)) {
            $(this).html(element);
          }
        })
      });
    })
  }

  init() {
    var vm = this;
    vm.document.ready(function() {
      vm.cols = document.getElementsByClassName("column");
      vm.tickets = document.getElementsByClassName("ticket");

      addListeners();

      vm.handleDragEnter = handleDragEnter;

      function addListeners() {
        angular.forEach(vm.cols, function (col) {
          col.addEventListener('dragenter', handleDragEnter, false);
          col.addEventListener('dragover', handleDragOver, false);
          col.addEventListener('dragleave', handleDragLeave, false);
          col.addEventListener('drop', handleDrop, false);
        });
        angular.forEach(vm.tickets, function (ticket) {
          ticket.addEventListener('dragstart', handleDragStart, false);
          ticket.addEventListener('dragend', handleDragEnd, false);
        });
      }

      function handleDragStart(e) {
        vm.dragSrcEl = this;
        vm.rowId = $(this).closest('tr').attr('id');

        vm['task' + vm.rowId].moved = true;
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/html', this.outerHTML);
      }

      function handleDragOver(e) {
        if (e.preventDefault) {
          e.preventDefault();
        }

        e.dataTransfer.dropEffect = 'move';
        return false;
      }

      function handleDragEnter(e) {
        if (vm.dragSrcEl != $(this).find('.ticket')[0] && vm.rowId == $(this).closest('tr').attr('id')) {
          this.classList.add('over');
        }
      }

      function handleDragLeave(e) {
        this.classList.remove('over');
      }

      function handleDrop(e) {
        if (e.stopPropagation) {
          e.stopPropagation();
        }

        if (vm.dragSrcEl != $(this).find('.ticket')[0] && vm.rowId == $(this).closest('tr').attr('id')) {
          $(vm.dragSrcEl).replaceWith($(this).html());
          this.innerHTML = e.dataTransfer.getData('text/html');
        }
        
        addListeners();

        return false;
      }

      function handleDragEnd(e) {
        angular.forEach(vm.cols, function (col) {
          col.classList.remove('over');
        });
        vm['task' + vm.rowId].moved = false;
      }
    });
  }
}

export default {
  template,
  // transclude: true,
  controller: Controller,
  bindings: {
    project: '<',
    tasks: '<'
  }
};

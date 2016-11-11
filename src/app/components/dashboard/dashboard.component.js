import template from './dashboard.tpl.html'
import styles from './dashboard.css'
import angular from 'angular'

class Controller {
  /** @ngInject */
  constructor($scope, $compile, $document, utils, DnD, tableConstruct) {
    var vm = this;

    // vm.scope = $scope;
    vm.DnD = DnD;
    vm.tableConstruct = tableConstruct;
    vm.tasks = vm.tasks.data;

    vm.tasks.forEach(function(task) {
      vm['task' + task.Id] = task;
      vm['task' + task.Id].moved = false;
      /*console.log('q ', task);
      vm.task = task;
      vm.tableConstruct.dashboardCreate(task, $scope);
      vm.DnD.init();*/
    });

    vm.dashboardCreate($scope, $compile, $document);
    vm.init($document, vm);
    // console.log(vm);
    // vm.DnD.init();
  }

  $onInit($compile, $document) {
    var vm = this;

    vm.styles = styles;
    // vm.tasks = vm.tasks.data;

    // vm.DnD.init();

    // vm.tasks.forEach(function(task) {
    //   vm.tableConstruct.dashboardCreate(task, vm.scope);
    // });
  }

  dashboardCreate($scope, $compile, $document) {
    var vm = this;

    vm.tasks.forEach(function(task) {
      var html = "<ticket tickets='$ctrl.tasks' ticket='$ctrl.task" + task.Id + "'></ticket>",
        template = angular.element(html),
        linkFn = $compile(template),
        element = linkFn($scope);

      $document.ready(function () {
        $('#' + task.Id + ' .column').each(function() {
          // console.log(this);
          // // $(this).html(element);
          // this.innerHTML = $(element).html();
          //
          /*var ticket = $(this).find('.ticket')[0];

          $(ticket).addClass('hidden');*/
          if ($(this).hasClass(task.Status.Name)) {
            $(this).html(element);
            // this.innerHTML = $(element).html();
            // $(ticket).removeClass('hidden');
          }
        })
      });
    })
  }

  init($document, vm) {
    $document.ready(function() {
      vm.cols = document.getElementsByClassName("column");
      vm.tickets = document.getElementsByClassName("ticket");

      addListeners();

      vm.handleDragEnter = handleDragEnter;

      function addListeners() {
        angular.forEach(vm.cols, function (col) {
          // col.addEventListener('dragenter', function() {
          //   vm.handleDragEnter(col);
          // }, false);
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
          /*dragSrcEl.innerHTML = this.innerHTML;
           this.innerHTML = e.dataTransfer.getData('text/html');*/
          // dragSrcEl.outerHTML = this.innerHTML;
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

        // vm['task' + vm.rowId].moved = false;
        // console.log('end ', vm['task' + vm.rowId]);
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

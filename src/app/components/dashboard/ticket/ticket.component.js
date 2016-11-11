import template from './ticket.tpl.html'
import styles from './ticket.css'
import angular from 'angular'

class Controller {
  /** @ngInject */
  constructor($scope, utils, DnD) {
    var vm = this;

    vm.DnD = DnD;

    $scope.$watchCollection(function() { return vm.ticket }, function(newValue, oldValue) {
      console.log('change ', vm.ticket);
    });
    /*$scope.$watchCollection(vm.tickets, function(newValue, oldValue) {
      console.log('change2 ', newValue, oldValue);
    });*/
  }

  $onInit() {
    var vm = this;

    vm.styles = styles;

    // console.log('ticket ', vm.ticket);
  }


}

export default {
  // transclude: true,
  template,
  controller: Controller,
  bindings: {
    tickets: '<',
    ticket: '<'
  }
};

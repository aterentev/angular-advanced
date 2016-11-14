import template from './ticket.tpl.html'
import styles from './ticket.css'
import angular from 'angular'

class Controller {
  /** @ngInject */
  constructor($scope, DnD) {
    var vm = this;

    vm.DnD = DnD;

    $scope.$watchCollection(function() { return vm.ticket }, function(newValue, oldValue) {
      console.log('change ', vm.ticket);
    });
  }

  $onInit() {
    var vm = this;

    vm.styles = styles;
  }


}

export default {
  template,
  controller: Controller,
  bindings: {
    tickets: '<',
    ticket: '<'
  }
};

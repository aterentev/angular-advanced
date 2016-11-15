import template from './ticket.tpl.html'
import styles from './ticket.css'
import angular from 'angular'

class Controller {
  /** @ngInject */
  constructor($scope, DnD) {
    var vm = this;

    vm.DnD = DnD;
  }

  $onInit() {
    var vm = this;

    vm.styles = styles;
  }

  $onChanges(changesObj) {
    console.log(changesObj.ticket);
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

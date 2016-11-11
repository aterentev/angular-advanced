import template from './task.tpl.html'
import styles from './task.css'

class Controller {
  /** @ngInject */
  constructor($location, utils) {
    var vm = this;

    // console.log('task ', vm.task);
    vm.styles = styles;
  }
}

export default {
  template,
  controller: Controller,
  bindings: {
    task: "<"
  }
};

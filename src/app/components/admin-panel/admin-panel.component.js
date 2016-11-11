import template from './admin-panel.tpl.html'
import styles from './admin-panel.css'

class Controller {
  /** @ngInject */
  constructor() {
    var vm = this;
    
    vm.styles = styles;
  }
}

export default {
  template,
  controller: Controller
};

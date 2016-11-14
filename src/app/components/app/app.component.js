import template from './app.tpl.html'
import styles from './app.css'

class Controller {
    /** @ngInject */
    constructor($location, utils) {
      var vm = this;

      vm.styles = styles;

      utils.checkAuth(vm.user);
    }
}

export default {
    template,
    controller: Controller,
    bindings: {
      user: "<"
    }
};

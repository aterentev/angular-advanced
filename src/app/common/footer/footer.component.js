import template from './footer.tpl.html'
import styles from './footer.css'

class Controller {
    /** @ngInject */
    constructor() {
      var vm = this;
      //
      vm.styles = styles;
    }
}

export default {
    template,
    controller: Controller
};

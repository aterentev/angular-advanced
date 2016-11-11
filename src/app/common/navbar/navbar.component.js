import template from './navbar.tpl.html'
import styles from './navbar.css'

class Controller {
  /** @ngInject */
  constructor($location, localStorageService, utils) {
    var vm = this;

    vm.logout = logout;
    vm.styles = styles;

    utils.checkAuth(vm.user);

    function logout($event) {
      $event.preventDefault();
      utils.user = {};
      localStorageService.remove('id');
      $location.path('/login');
    }
  }
}

export default {
  template,
  controller: Controller,
  bindings: {
    user: '<'
  }
};

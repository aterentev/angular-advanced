import template from './login.tpl.html'
import styles from './login.css'

class Controller {
  /** @ngInject */
  constructor($location, localStorageService, utils) {
    var vm = this;

    vm.styles = styles;

    vm.enter = enter;
    vm.message = '';
    vm.popoverNameOpen = false;
    vm.popoverPassOpen = false;

    function enter($event) {
      utils.authorize(vm.login, vm.password)
        .then(function(res) {
          vm.user = res.data;

          utils.user = vm.user;
          localStorageService.set('id', res.data.Id);
          localStorageService.set('role', 'admin');
          $location.path('/');
        }, function(res) {
          console.log('error ', res);

          if (res.status == 401) {
            vm.popoverOpen = true;
            vm.message = res.data.Message;
            vm.password = '';
          }

          $location.path('/login');
        });
    }
  }
}

export default {
  template,
  controller: Controller
};

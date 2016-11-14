import template from './login.tpl.html'
import styles from './login.css'

class Controller {
  /** @ngInject */
  constructor($location, localStorageService) {
    var vm = this;

    vm.styles = styles;

    vm.location = $location;
    vm.localStorageService = localStorageService;
  }

  $onInit() {
    var vm = this;

    vm.message = '';
    vm.popoverNameOpen = false;
    vm.popoverPassOpen = false;
  }

  enter() {
    var vm = this;

    vm.utils.authorize(vm.loginName, vm.password)
      .then(function(res) {
        vm.user = res.data;

        vm.utils.user = vm.user;
        vm.localStorageService.set('id', res.data.Id);
        vm.localStorageService.set('role', 'admin');
        vm.$location.path('/');
      }, function(res) {
        console.log('error ', res);

        if (res.status == 401) {
          vm.popoverOpen = true;
          vm.message = res.data.Message;
          vm.password = '';
        }

        vm.location.path('/login');
      });
    }
  }

export default {
  template,
  controller: Controller
};

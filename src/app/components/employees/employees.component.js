import template from './employees.tpl.html'
import styles from './employees.css'

class Controller {
  /** @ngInject */
  constructor(utils) {
    var vm = this;

    vm.utils = utils;
    // console.log('employees ', vm.employees);
  }
  $onInit() {
    var vm = this;

    vm.styles = styles;
    vm.employees = vm.employees.data;
  }
  deleteEmployee(employee) {
    var vm = this,
      index = vm.employees.indexOf(employee);
    
    vm.utils.deleteData('employees', employee.Id)
      .then(function(res) {
        console.log('deleteEmployee success ', res);
        vm.employees.splice(index, 1);
      }, function (res) {
        console.log('deleteEmployee error ', res);
      })
  }
}

export default {
  template,
  controller: Controller,
  bindings: {
    employees: '<'
  }
};

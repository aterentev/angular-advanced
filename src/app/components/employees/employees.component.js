import template from './employees.tpl.html'
import styles from './employees.css'
import MyModalController from './my-modal.controller'
import myModalTemplate from './modal.tpl.html'

class Controller {
  /** @ngInject */
  constructor($uibModal, utils) {
    var vm = this;

    vm.uibModal = $uibModal;
    vm.utils = utils;
  }

  $onInit() {
    var vm = this;

    vm.styles = styles;
    vm.employees = vm.employees.data;
  }

  addEmployee() {
    var vm = this,
      modalInstance = vm.uibModal.open({
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',
      template: myModalTemplate,
      resolve: {
        employees: function() {
          return vm.employees
        }
      },
      controller: MyModalController,
      controllerAs: 'myModalCtrl'
    });
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

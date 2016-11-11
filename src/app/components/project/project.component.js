import template from './project.tpl.html'
import styles from './project.css'

class Controller {
  /** @ngInject */
  constructor(utils) {
    var vm = this;

    vm.utils = utils;
    // console.log('project ', vm.team, vm.project);

    // vm.styles = styles;
    // vm.employees = vm.employees.data;

    // vm.addEmployee = addEmployee;
    // vm.deleteEmployee = deleteEmployee;
    // vm.onSelect = onSelect;

    /*function addEmployee() {
      vm.editSelect = true;
    }*/

    /*function deleteEmployee(employee) {
      var index = vm.team.indexOf(employee);

      utils.deleteData('team', 'projectId=' + vm.project.Id + '&employeeId=' + employee.Id)
        .then(function(res) {
          vm.team.splice(index, 1);
        }, function(res) {
          console.log('deleteEmployee error ', res);
        })
    }*/

    /*function onSelect($item, $model, $label) {
      console.log('onSelect ', $item);

      utils.serverReq('POST', 'team', {
        ProjectId: vm.project.Id,
        EmployeeId: $item.Id
      })
        .then(function(res) {
          vm.team.push(res.data);
          vm.selected = "";
          vm.editSelect = false;
          console.log('onSelect success ', res);
        }, function(res) {
          console.log('onSelect error ', res);
        });
    }*/
  }

  $onInit() {
    var vm = this;

    vm.styles = styles;
    vm.employees = vm.employees.data;
    vm.StartDate = new Date(vm.project.StartDate);
    vm.EndDate = new Date(vm.project.EndDate);
  }

  addEmployee() {
    var vm = this;

    vm.editSelect = true;
  }

  deleteEmployee(employee) {
    var vm = this,
      index = vm.team.indexOf(employee);

    vm.utils.deleteData('team', 'projectId=' + vm.project.Id + '&employeeId=' + employee.Id)
      .then(function(res) {
        vm.team.splice(index, 1);
      }, function(res) {
        console.log('deleteEmployee error ', res);
      })
  }

  onSelect($item, $model, $label) {
    var vm = this;

    vm.utils.serverReq('POST', 'team', {
      ProjectId: vm.project.Id,
      EmployeeId: $item.Id
    })
      .then(function(res) {
        vm.team.push(res.data);
        // vm.selected = "";
        // vm.editSelect = false;
        console.log('onSelect success ', res);
      }, function(res) {
        console.log('onSelect error ', res);
      });
  }
}

export default {
  template,
  controller: Controller,
  bindings: {
    project: '<',
    team: '<',
    employees: '<'
  }
};

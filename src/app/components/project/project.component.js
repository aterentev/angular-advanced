import template from './project.tpl.html'
import styles from './project.css'

class Controller {
  /** @ngInject */
  constructor(utils) {
    var vm = this;

    vm.utils = utils;
  }

  $onInit() {
    var vm = this;

    vm.styles = styles;
    vm.StartDate = new Date(vm.project.StartDate);
    vm.EndDate = new Date(vm.project.EndDate);

    if (!vm.project.Id) {
      vm.isNewProject = true;
    } else {
      vm.isNewProject = false;
    }
  }

  addEmployee() {
    var vm = this;

    vm.editSelect = true;
  }

  cancelEdit() {
    var vm = this;

    vm.infoEdited = false;
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
        console.log('onSelect success ', res);
      }, function(res) {
        console.log('onSelect error ', res);
      });
  }

  saveEdit() {
    var vm = this;

    var data = {
      Name: vm.project.Name,
      Description: vm.editedInfo.description,
      CustomerName: vm.editedInfo.customer,
      ImageUrl: vm.project.ImageUrl,
      StartDate: vm.editedInfo.startDate,
      EndDate: vm.editedInfo.endDate,
      Id: vm.project.Id
    };

    if (vm.isNewProject) {
      data.Id = Math.floor((Math.random()*6)+1);
    }

    vm.utils.serverReq('PUT', 'projects', data)
      .then(function(res) {
        console.log(res);
        vm.project.Name = res.data.Name;
        vm.project.Description = res.data.Description;
        vm.project.CustomerName = res.data.CustomerName;
        vm.project.ImageUrl = res.data.ImageUrl;
        vm.project.StartDate = res.data.StartDate;
        vm.project.EndDate = res.data.EndDate;
        vm.Id = res.data.Id;

        vm.$onInit();
      }, function(rej) {
        console.log(rej);
      });


    vm.infoEdited = false;
  }

  startEdit() {
    var vm = this;

    vm.editedInfo = {
      customer: vm.project.CustomerName,
      startDate: vm.StartDate,
      endDate: vm.EndDate,
      description: vm.project.Description
    };

    vm.infoEdited = true;
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

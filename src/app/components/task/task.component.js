import template from './task.tpl.html'
import styles from './task.css'

class Controller {
  /** @ngInject */
  constructor($location, utils) {
    var vm = this;

    // console.log('task ', vm.task);
    vm.styles = styles;
    vm.utils = utils;
    vm.location = $location;
  }

  $onInit() {
    var vm = this;

    vm.selectedStatus = vm.task.Status;
    vm.selectedType = vm.task.TicketType;
    vm.selectedReporter = vm.task.Reporter;
    vm.selectedResponsible = vm.task.Responsible;
    vm.StartDate = new Date(vm.task.StartDate);

    if (!vm.task.EndDate) {
      vm.EndDate = new Date();
    } else {
      vm.EndDate = new Date(vm.task.EndDate);
    }

    vm.types = [
      {Name: 'Technical Task', Id: 1},
      {Name: 'Bug', Id: 2},
      {Name: 'Improvement', Id: 3},
      {Name: 'Feature', Id: 4},
      {Name: 'Task', Id: 5}
    ];

    vm.statuses = [
      {Name: 'Open', Id: 1},
      {Name: 'Development', Id: 2},
      {Name: 'Ready for QA', Id: 3},
      {Name: 'Closed', Id: 4}
    ];

  }

  cancel() {
    var vm = this;

    vm.edited = false;
  }

  deleteTask() {
    var vm = this;

    vm.utils.deleteData('tasks', 'id=' + vm.task.Id)
      .then(function(res) {
        console.log(res);
      }, function(rej) {
        console.log(rej);
      });

    vm.location.path('/');
  }

  edit() {
    var vm = this;

    vm.editedInfo = {
      Estimate: vm.task.Estimate,
      StartDate: vm.StartDate,
      EndDate: vm.EndDate,
      Description: vm.task.Description
    };

    vm.edited = true;
  }

  save() {
    var vm = this;

    var data = {
      Name: vm.task.Name,
      Description: vm.editedInfo.Description,
      Estimate: vm.editedInfo.Estimate,
      StartDate: vm.editedInfo.StartDate,
      EndDate: vm.editedInfo.EndDate,
      StatusId: vm.selectedStatus.Id,
      ResponsibleId: vm.selectedResponsible.Id,
      TypeId: vm.selectedType.Id,
      ProjectId: vm.task.ProjectId,
      ReporterId: vm.selectedReporter.Id,
      StudentId: 0,
      Id: vm.task.Id
    };

    vm.utils.serverReq('PUT', 'tasks', data)
      .then(function(res) {
        console.log(res);

        vm.task.Description = res.data.Description;
        vm.task.Estimate = res.data.Estimate;
        vm.task.StartDate = res.data.StartDate;
        vm.task.EndDate = res.data.EndDate;
        vm.task.StatusId = res.data.Status.Id;
        vm.task.ResponsibleId = res.data.ResponsibleId;
        vm.task.Responsible = res.data.Responsible;
        vm.task.TypeId = res.data.TypeId;
        vm.task.ProjectId = res.data.ProjectId;
        vm.task.ReporterId = res.data.ReporterId;
        vm.task.Reporter = res.data.Reporter;

        vm.$onInit();
      }, function(rej) {
        console.log(rej);
      });

    vm.edited = false;
  }
}

export default {
  template,
  controller: Controller,
  bindings: {
    task: "<",
    employees: '<'
  }
};

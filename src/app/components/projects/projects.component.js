import template from './projects.tpl.html'
import styles from './projects.css'

class Controller {
  /** @ngInject */
  constructor(utils) {
    var vm = this;

    vm.utils = utils;
  }

  $onInit() {
    var vm = this;

    vm.styles = styles;
  }

  addProject(project) {

  }

  deleteProject(project) {
    var vm = this,
      index = vm.projects.data.indexOf(project);

    this.utils.deleteData('projects', project.Id)
      .then(function(res) {
        vm.projects.data.splice(index, 1);
      }, function(res) {
        console.log('deleteProject error', res);
      })
  }
}

export default {
  template,
  controller: Controller,
  bindings: {
    projects: '<'
  }
};

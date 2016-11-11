import template from './projects.tpl.html'
import styles from './projects.css'

class Controller {
  /** @ngInject */
  constructor(utils) {
    var vm = this;

    vm.utils = utils;
    // console.log('projects ', vm.projects);
  }
  
  $onInit() {
    var vm = this;
    
    vm.styles = styles;
    vm.projects = this.projects.data;
  }
  
  addProject(project) {
    
  }
  
  deleteProject(project) {
    var vm = this,
      index = vm.projects.indexOf(project);
    
    this.utils.deleteData('projects', project.Id)
      .then(function(res) {
        console.log('deleteProject success', res);
        vm.projects.splice(index, 1);
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

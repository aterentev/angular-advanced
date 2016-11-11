import angular from 'angular';
import LocalStorageModule from 'angular-local-storage';

import login from './login/login.component'
import adminPanel from './admin-panel/admin-panel.component'
import profile from './profile/profile.component'
import employees from './employees/employees.component'
import projects from './projects/projects.component'
import project from './project/project.component'
// import dashboard from './dashboard/dashboard.component'
import task from './task/task.component'

import utils from './../factories/utils.factory'
import tableConstruct from './../factories/table-constructor.factory'
import DnD from '../factories/DnD.factory'

import {appModule} from './app/app.module'
import {dashboardModule} from './dashboard/dashboard.module'

export const componentsModule = 'myApp.components';

angular
    .module(componentsModule, [
      LocalStorageModule,
      appModule,
      dashboardModule
    ])
    .config(function(localStorageServiceProvider) {
      localStorageServiceProvider.setPrefix('myApp');
    })
    .component('login', login)
    .component('adminPanel', adminPanel)
    .component('profile', profile)
    .component('employees', employees)
    .component('projects', projects)
    .component('project', project)
    // .component('dashboard', dashboard)
    .component('task', task)

    .factory('utils', utils)
    .factory('tableConstruct', tableConstruct)
    .factory('DnD', DnD);


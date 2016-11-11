import angular from 'angular';

import footer from './footer/footer.component'
import navbar from './navbar/navbar.component'

import utils from './../factories/utils.factory'

export const commonModule = 'myApp.common';

angular
    .module(commonModule, [])
    .component('myFooter', footer)
    .component('navbar', navbar)

    .factory('utils', utils);

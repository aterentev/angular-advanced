import angular from 'angular';

import {ticketModule} from './ticket/ticket.module';

import dashboard from './dashboard.component'

export const dashboardModule = angular
  .module('dashboardModule', [
    ticketModule
  ])
  .component('dashboard', dashboard)
  .name;

import angular from 'angular';

import timesheets from './timesheets.component'

export const timesheetsModule = angular
  .module('timesheetsModule', [])
  .component('timesheets', timesheets)
  .name;

import angular from 'angular';

import {timesheetsModule} from './timesheets/timesheets.module';

import app from './app.component'

export const appModule = angular
  .module('appModule', [
    timesheetsModule
  ])
  .component('app', app)
  .name;

import angular from 'angular';

import ticket from './ticket.component'

export const ticketModule = angular
  .module('ticketModule', [])
  .component('ticket', ticket)
  .name;

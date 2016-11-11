export default routesConfig;

/** @ngInject */
function routesConfig($stateProvider, $urlRouterProvider, $locationProvider) {
    $locationProvider.html5Mode(true).hashPrefix('!');
    $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('app', {
      url: '/',
      component: 'app',
      resolve: {
        user: function(localStorageService, utils) {
          var id = localStorageService.get('id');

          if (id) {
            return utils.getById('GET', 'employees/', id);
          }
        }
      }
    })
    .state('login', {
      url: '/login',
      component: 'login'
    })
    .state('app.adminPanel', {
      url: 'adminPanel',
      component: 'adminPanel'
    })
    .state('app.profile', {
      url: 'profile/{userId}',
      component: 'profile',
      resolve: {
        user: function($transition$, utils) {
          return utils.getById('GET', 'employees/', $transition$.params().userId);
        },
        skills: function(utils) {
          return utils.serverReq('GET', 'skills');
        }
      }
    })
    .state('app.employees', {
      url: 'employees',
      component: 'employees',
      resolve: {
        employees: function(utils) {
          return utils.serverReq('GET', 'employees')
        }
      }
    })
    .state('app.projects', {
      url: 'projects',
      component: 'projects',
      resolve: {
        projects: function(utils) {
          return utils.serverReq('GET', 'projects')
        }
      }
    })
    .state('app.project', {
      url: 'project/{projectId}',
      component: 'project',
      resolve: {
        project: function($transition$, utils) {
          return utils.getById('GET', 'projects/', $transition$.params().projectId)
        },
        team: function($transition$, utils) {
          return utils.getById('GET', 'team/', $transition$.params().projectId)
        },
        employees: function(utils) {
          return utils.serverReq('GET', 'employees')
        }
      }
    })
    .state('app.dashboard', {
      url: 'dashboard/{projectId}',
      component: 'dashboard',
      resolve: {
        project: function($transition$, utils) {
          return utils.getById('GET', 'projects/', $transition$.params().projectId)
        },
        tasks: function($transition$, utils) {
          return utils.searchData('tasks', 'taskSearch.projectId=' + $transition$.params().projectId)
        }
      }
    })
    .state('app.task', {
      url: 'task/{taskId}',
      component: 'task',
      resolve: {
        task: function($transition$, utils) {
          return utils.getById('GET', 'tasks/', $transition$.params().taskId);
        }
      }
    });

}

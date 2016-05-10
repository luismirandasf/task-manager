
angular.module('taskManagerApp')
.config(function($routeProvider){

  $routeProvider

  .when('/', {
    redirectTo: '/tareas'
  })

  .when('/tareas', {
    templateUrl: '/templates/pages/tareas/index.html',
    controller: 'tareasIndexController',
    controllerAs: 'tareasIndex'
  })

  .when('/usuarios', {
    templateUrl: '/templates/pages/usuarios/index.html',
    controller: 'UsuariosIndexController',
    controllerAs: 'UsuariosIndex'
  })

  .when('/tareas/nueva', {
      templateUrl: 'templates/pages/tareas/nueva.html',
      controller: 'tareaNuevaController',
      controllerAs: 'tareaNuevaCtrl'
    })

  .when('/tareas/:id', {
    templateUrl: 'templates/pages/tareas/tarea-show.html',
    controller: 'tareaShowController',
    controllerAs: 'tareaShowCtrl'
  })

  .otherwise({redirectTo: '/'});

});

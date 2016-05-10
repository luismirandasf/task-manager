
angular.module('taskManagerApp')
.controller('tareaShowController', function($routeParams, tarea) {
  console.log('routeParams: '+$routeParams.id)
  var controller = this;
  controller.tarea = tarea.get({id: $routeParams.id});
  
});

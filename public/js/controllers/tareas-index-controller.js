
angular.module('taskManagerApp')
.controller('tareasIndexController', function($scope, tarea) {
  var controller = this;
  controller.tareas = tarea.query();
  console.log(tarea.query(0))

});

/*angular.module('taskManagerApp')
.controller('tareasIndexController', ['$scope', function($scope, tarea) {
    
  var controller = this;
  controller.tareas = tarea.query();
  console.log(tarea.query(0))

}]);*/
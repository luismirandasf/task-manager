

angular.module('taskManagerApp')
.controller('tareaNuevaController', function($scope, tarea) {
  this.tarea = {};
  $scope.tarea = new tarea();//////////////resource
  this.guardaNuevatarea = function() {
    console.log(this.tarea);
    var d = new Date(this.tarea.tarea);
    console.log(d.getTime());
    var controller = this;
    controller.errors = null;
    $scope.tarea.$save(this.tarea)/////////////resource
    .catch(function(tarea) {
      controller.errors = tarea.data.error;
    })
    this.tarea = {};
  };
});


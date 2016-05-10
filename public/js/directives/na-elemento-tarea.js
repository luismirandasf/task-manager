

angular.module('taskManagerApp')
  .directive('naElementoTarea', function(){
    return {
      restrict: 'E',
      templateUrl: '/templates/directives/na-elemento-tarea.html',
      scope: {
        titulo: '=',
        descripcion: '=',
        fecha: '=',
        image: '=',
        caducada: '=',
        id: '=',
        borrada: '='
      },
      controller: function($scope, tarea){

        $scope.cambiarCaducidad = function() {
          var tareaCaducada = {_id: $scope.id, caducada: true};
          console.log(tareaCaducada);
          this.tarea = {};
          $scope.tarea = new tarea();//////////////resource
          console.log($scope);
          $scope.tarea.$save(tareaCaducada)
          $scope.caducada = true;
        };

        $scope.eliminarNota = function() {
          console.log($scope.borrada);
          var borrarTarea = {_id: $scope.id, borrar: true};
          console.log(borrarTarea);
          this.tarea = {};
          $scope.tarea = new tarea();//////////////resource
          //console.log($scope);
          $scope.tarea.$save(borrarTarea)
          $scope.borrada = true;
        };

        //$scope.loadData();
      },
      link: function(scope, element, attrs){
        element.on("click", function(){
        element.find(".informacion").toggleClass('hidden');

        });
        /*$(".completedTaskBtn").on("click",function(){

          console.log("HOLA");
        });*/
      }
    };
  });

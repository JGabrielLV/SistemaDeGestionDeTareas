var app = angular.module('appSGTareas', []);

app.factory('$SGTareaService', ['$http', function ($http) {
    // url base para invocar las apis necesarias
    var baseUrl = 'https://localhost:44365/api/Tareas/';
    return {
        // funcion para invocar el api que obtendra todas las tareas
        GetAllSGTareas: function () {
            return $http.get(baseUrl);
        },        
        // funcion para invocar el api de agregar una nueva tarea
        PostSGTarea: function (tarea) {
            return $http.post(baseUrl, tarea);
        },
        // funcion para invocar el api de actualizar una tarea ya existente
        PutSGTarea: function (tarea) {
            return $http.put(baseUrl + tarea.Id, tarea);
        },
        // funcion para invocar el api de eliminar una tarea
        DeleteSGTarea: function (id) {
            return $http.delete(baseUrl + id);
        }
    };
}]);

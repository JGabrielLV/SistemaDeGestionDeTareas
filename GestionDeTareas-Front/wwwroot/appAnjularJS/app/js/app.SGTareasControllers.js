app.controller('SGTareasController', ['$scope', '$SGTareaService', '$timeout', function ($scope, $SGTareaService,$timeout) {
    $scope.tareas = [];
    $scope.tarea = {};
    $scope.tbodyLTareasB = false;
    // funcion para obtener y cargar todas las tareas en la tabla
    $scope.CargarTareas = function () {
        $SGTareaService.GetAllSGTareas().then(function (response) {
            $scope.tbodyLTareasB = false;
            $scope.tareas = response.data;

            $("#tblLTareas" ).DataTable().destroy();
            $timeout(function () {
                initTableLConsListaTareas('tblLTareas', $scope.tareas.Datos.length);

                $scope.tbodyLTareasB = true;
            }, 0);
        });
    };
    

    // funcion para agregar una nueva tarea
    $scope.PostTarea = function () {
        $SGTareaService.PostSGTarea($scope.tarea).then(function (response) {            
            $scope.CargarTareas();
            $scope.tarea = {};
            $scope.showModal();
            if (response.status == 200) {
                toastShow('s',
                    '', '', response.data.MensajeUsuario);
            } else {
                toastShow('d',
                    '', '', response.data.MensajeUsuario);
            }
        });
    };

    // funcion para actualizar una tarea
    $scope.PutTarea = function () {
        $SGTareaService.PutSGTarea($scope.tarea).then(function (response) {
            $scope.CargarTareas();
            $scope.tarea = {};
            $scope.showModal();
            if (response.status == 200) {
                toastShow('s',
                    '', '', response.data.MensajeUsuario);
            } else {
                toastShow('d',
                    '', '', response.data.MensajeUsuario);
            }
        });
    };

    // funcion que s eencarga de verificar si se va agregar o actualizar una tarea
    $scope.PostPutTarea = function () {
        if ($scope.tarea.Id == 0) {
            $scope.PostTarea();
        } else {
            $scope.PutTarea();
        }
    }

    // funcion para eliminar una tarea
    $scope.DeleteTarea = function (id) {
        
        if (confirm("¿Estás seguro de que quieres eliminar esta tarea?")) {
            $SGTareaService.DeleteSGTarea(id).then(function (response) {
                $scope.CargarTareas();
                if (response.status == 200) {
                    toastShow('s',
                        '', '', response.data.MensajeUsuario);
                } else {
                    toastShow('d',
                        '', '', response.data.MensajeUsuario);
                }
            });
        }
    };

    //  ejecutar funcion para cargar las tarea al principio 
    $scope.CargarTareas();

    $scope.modalVisible = true;

    // funcion para visualizar el modal donde se podra realizar el llenado de los datos para agregar o actualizar una tarea
    $scope.showModal = function (_tarea=null) {
        $('#mPostPutTarea').modal({ backdrop: 'static', keyboard: false });
        $('#mPostPutTarea').modal('toggle');
        $scope.tarea = {};
        $scope.tarea.Id = 0;
        if (_tarea != null) {
            $scope.tarea.Id = _tarea.Id;
            $scope.tarea.Titulo = _tarea.Titulo;
            $scope.tarea.Descripcion = _tarea.Descripcion;
            $scope.tarea.Estado = _tarea.Estado;
        }
        //$scope.modalVisible = true;
    };

}]);

// funcion para dar diseño y mas funciones a la tabla una ves que ya tiene cargados los datos
function initTableLConsListaTareas(idTab, countFilasTab) {

    var table = $("#" + idTab + "").DataTable({
        "searching": true,
        "searchDelay": 0,// to the given number of milliseconds 
        "paging": true,
        "lengthChange": true,
        "lengthMenu": [[2, 5, 10, 25, 50, 75, 100, -1], ["2", "5", "10", "25", "50", "75", "100", "Todos"]],
        //"pagingType": "full",
        "pageLength": 5,
        "scrollX": false,
        "autoWidth": false,
        "children": false,
        "info": true,
        "orderMulti": false,
        "ordering": true,
        "order": [[0, 'desc']],
        "orderClasses": true,
        "orderable": true,
        "stripeClasses": ['stripe-1', 'stripe-2', 'stripe-3'],
        "processing": true,
        "scrollCollapse": false,
        "scrollY": "",
        initComplete: function (settings, json) {
            //// Set the background color of the tableCorreccion 
            //// to green after the initialisation of the 
            //// tableCorreccion has completed 
            //$("#tableID, td, tr")
            //    .css("background-color", "lightgreen");

            //console.log(
            //    "The color of the tableCorreccion has changed!"
            //)
        },
        "language": {
            "sEmptyTable": "No se encontró ningún dato disponible en esta tabla",
            "sInfoPostFix": "",
            "sSearch": "",
            "sUrl": "",
            "sInfoThousands": ",",
            "searchPlaceholder": "Buscar",
            "sLoadingRecords": "Cargando...",
            "oPaginate": {
                "sFirst": "Primero",
                "sLast": "Último",
                "sNext": "Siguiente",
                "sPrevious": "Anterior"
            },
            /*"oAria": {
                "sSortAscending": ": Activar para ordenar la columna de manera ascendente",
                "sSortDescending": ": Activar para ordenar la columna de manera descendente"
            }*/
        },
        "responsive": false,
        "columnDefs": [
            //{ "className": "text-center details-control", "targets": [0], visible: true }, //// details-control = CLASE QUE ACTIVA DETALLE O HIJOS DE FILAS
            { "className": "text-center ", "targets": '_all', visible: true }, //// SE VISUALIZAN TODAS LAS COLUMNAS
            { "className": "text-center ", "targets": [0, 1], visible: false }////  visible: true = SE VISUALIZAN N CANTIDAD DE COLUMNAS, visible: false = NO SE VISUALIZAN N CANTIDAD DE COLUMNAS, EJEMPLO 2 COLUMNAS NO VISIBLES           
        ],
        "bDestroy": true,
        "dom": '<lf<t><"col-lg-12 col-md-12 col-sm-12"i>p>'
    });

    var tableCorreccion = $("#" + idTab).DataTable();
    tableCorreccion.columns.adjust().draw();
    $("#" + idTab + "_length label").css("color", "black");
    $("#" + idTab + "_length select").css('margin-right', '5px');
    $("#" + idTab + "_length select").css('margin-left', '5px');
    $("#" + idTab + "_length select").css('margin-top', '5px');
    $("#" + idTab + "_length select").css("color", "#666666");
    $("#" + idTab + "_length select").css("border", "0px");
    $("#" + idTab + "_length select").css("text-align", "center");
    $("#" + idTab + "_length select").css("width", "auto");

    //var txtBuscar = document.getElementById(idTab + "_filter");
    //txtBuscar.children[0].children[0].id = "txtBuscar";
    $("#" + idTab + "_filter label input").css('border-radius', '2rem');
    $("#" + idTab + "_filter label input").css('margin-left', '-.5rem');

    //var select = document.getElementById(idTab + "_length");
    //select.children[0].children[0].id = idTab + "Select1";

    //select.children[0].children[0].innerHTML = "";
    //select.children[0].children[0].options[0] = new Option("5", "5", true, true);
    //select.children[0].children[0].options[1] = new Option("10", "10");
    //select.children[0].children[0].options[2] = new Option("20", "20");
    //select.children[0].children[0].options[3] = new Option("50", "50");
    //select.children[0].children[0].options[4] = new Option("75", "75");
    //select.children[0].children[0].options[5] = new Option("100", "100");
    //select.children[0].children[0].className = "input-sm form-select";
    $("#" + idTab + "_filter label").css('margin-top', '5px');


    $("#" + idTab + "_wrapper").css("overflow-y", "auto");
    $("#" + idTab + "_wrapper").css("width", "100%");
    $("#" + idTab + "_wrapper").css("margin-left", "2%");
    $("#" + idTab + "_paginate").css("margin-bottom", "0%");
    //$("#" + idTab + "Select1").css('border-radius', '2rem');
    //$("#" + idTab + "Select1").css("width", "auto");;

    if (countFilasTab == 0) {

        $("#" + idTab + " tbody tr td").css("vertical-align", "middle");
        $("#" + idTab + " tbody tr td").css("background-color", "white");
        $("#" + idTab + " tbody tr td").css("border-radius", "3rem");
        var c = $("#" + idTab + " tbody tr td");
        c[0].colSpan = c[0].colSpan - 1;
    }
    //DETALLE O HIJOS DE FILAS DE LA TABLA
    $("#" + idTab + " tbody").on('click', 'td.details-control', function () {

        var tr = $(this).closest('tr');
        var row = table.row(tr);

        if (row.child.isShown()) {

            // Closing the already opened row            
            row.child.hide();

            // Removing class to hide 
            tr.removeClass('shown');
        }
        else {

            var rowTabDescPuestoSoliciMod1 = document.getElementById("rowTabDescPuestoSoliciMod1");
            // Show the child row for detail 
            // information 
            row.child(getChildRow2(row.data())).show();

            // To show details,add the below class 
            tr.addClass('shown');

            var tdDetalle = tr[0].nextSibling.children[0];
            tdDetalle.style.borderRadius = '2rem';
            tr[0].nextSibling.style.backgroundColor = 'rgba(0, 0, 0, 0.075)';
        }
    });
};
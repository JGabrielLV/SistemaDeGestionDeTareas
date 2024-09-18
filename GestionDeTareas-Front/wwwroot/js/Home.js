function sendValues(fields, doSuccess, doError, urlAction, typeMethod = "POST") {

    $(document.body).css({ 'cursor': 'wait' });
    $.ajax({
        url: urlAction || $('#url').val(),
        type: typeMethod,
        data: fields || {},
        datatype: "json",

        success: function (result) {
            if (result.IsOk) {
                if (doSuccess === undefined)
                    success();
                else
                    doSuccess(result);

                $(document.body).css({ 'cursor': 'default' });
            }
            else {
                if (doError === undefined)
                    error();
                else
                    doError(result);

                $(document.body).css({ 'cursor': 'default' });
            }
        },
        error: function (result) {
            if (doError === undefined)
                error();
            else
                doError(result);
            $(document.body).css({ 'cursor': 'default' });
        }
    });
};

function openWindowWithPost(url, data, _target, _method = "POST") {
    var form = document.createElement("form");
    form.target = _target;
    form.method = _method;
    form.action = url;
    form.style.display = "none";

    for (var key in data) {
        var input = document.createElement("input");
        input.type = "hidden";
        input.name = key;
        input.value = data[key];
        form.appendChild(input);
    }
    document.body.appendChild(form);
    form.submit();
    document.body.removeChild(form);
};
function backPag1() {
    window.history.back();
};
function toastShow(IdToast, txtHeaderLeft, txtHeaderRight, txtBody) {
    switch (IdToast) {
        case 'Success':
        case 'success':
        case 'S':
        case 's':
            toast_Show('toastAviso_Success', 'txtToastHeaderLeft_Success', 'txtToastHeaderRight_Success', 'txtToastBody1_Success',
                txtHeaderLeft, txtHeaderRight, txtBody);
            break;
        case 'Warning':
        case 'warning':
        case 'W':
        case 'w':
            toast_Show('toastAviso_Warning', 'txtToastHeaderLeft_Warning', 'txtToastHeaderRight_Warning', 'txtToastBody1_Warning',
                txtHeaderLeft, txtHeaderRight, txtBody);
            break;
        case 'Danger':
        case 'danger':
        case 'D':
        case 'd':
            toast_Show('toastAviso_Danger', 'txtToastHeaderLeft_Danger', 'txtToastHeaderRight_Danger', 'txtToastBody1_Danger',
                txtHeaderLeft, txtHeaderRight, txtBody);
            break;
    }
}
function toast_Show(IdToast, IdHeaderLeft, IdHeaderRight, IdBody,
    txtHeaderLeft, txtHeaderRight, txtBody) {
    //$(".toast").each(function () {
    //    $('#' + this.id).toast('hide');
    //    $('#Div' + this.id)[0].style.zIndex = -10000;
    //});

    // Success
    $('#toastAviso_Success').toast('hide');
    $('#DivtoastAviso_Success')[0].style.zIndex = -10000;

    // Success
    $('#toastAviso_Warning').toast('hide');
    $('#DivtoastAviso_Warning')[0].style.zIndex = -10000;

    // Success
    $('#toastAviso_Danger').toast('hide');
    $('#DivtoastAviso_Danger')[0].style.zIndex = -10000;

    document.getElementById(IdHeaderLeft).textContent = txtHeaderLeft;
    document.getElementById(IdHeaderRight).textContent = txtHeaderRight;
    document.getElementById(IdBody).textContent = txtBody;
    $('#' + IdToast).toast({
        animation: true,
        autohide: true,
        delay: 1000000
    });
    var toastT = $('#Div' + IdToast);
    var toastP = toastT[0].offsetParent;
    if (toastT != null) {
        toastT[0].style.zIndex = 10000000000000000;
    }
    $('#' + IdToast).toast('show');
};
function select2BuscardorModal(idModal) {
    $(function () {
        $('.form-selectBuscardorModal').select2({
            //$('select').select2({
            placeholder: "Seleccionar una opción.",
            allowClear: true,
            "language": {
                "noResults": function () {
                    return "No se han encontrado resultados.";
                },
                "language": "es"
            },
            dropdownParent: $('#' + idModal + ' .modal-body')
            //width: 'resolve'
            //,theme: "classic"
        });


    });
};
$(document).ready(function () {
    $(function () {
        $('.form-selectBuscardor').select2({
            //$('select').select2({
            placeholder: "Seleccionar una opción.",
            allowClear: true,
            "language": {
                "noResults": function () {
                    return "No se han encontrado resultados.";
                },
                "language": "es"
            }
            //width: 'resolve'
            //,theme: "classic"
        });


    });
});

function reiniciarValidity() {
    $("input").each(function () {
        this.setCustomValidity('');
        this.setCustomValidity('');
    });
    $("textarea").each(function () {
        this.setCustomValidity('');
    });
    $("select").each(function () {
        this.setCustomValidity('');
    });
}
function txt_soloNumeros_onkeydown(key) {
    return (key >= '0' && key <= '9') || key == 'Backspace';
}
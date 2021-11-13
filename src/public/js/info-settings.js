const btnEliminar = document.getElementById("btn-delete");
const textValor = document.getElementById("text-valor");
const btnSave = document.getElementById("btn-save");
const inputFecha = document.getElementById('dateFecha');

for (let i = 0; i < inputFecha.length; i++) {
    console.log(inputFecha[i]);                
}

/*btnEliminar.addEventListener('click', () => {
    textValor.removeAttribute("disabled");
    btnSave.removeAttribute("disabled");
});

btnSave.addEventListener('click', () => {
    textValor.setAttribute("disabled", "");
});*/

$(function () {
    $('#datepicker').datepicker({
        closeText: 'Cerrar',
        prevText: '<Ant',
        nextText: 'Sig>',
        currentText: 'Hoy',
        monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
        monthNamesShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
        changeMonth: true,
        changeYear: true,
        showButtonPanel: true,
        dateFormat: 'MM yy',
        onClose: function (dateText, inst) {
            $(this).datepicker('setDate', new Date(inst.selectedYear, inst.selectedMonth, 1));
        },
        onSelect: function (date) {

            
            alert(date);
        },
    });
});



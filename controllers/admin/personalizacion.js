// Constante para completar la ruta de la API.
const PERSONALIZACION_API = 'services/admin/personalizacion.php';
// Constantes para establecer los elementos del formulario de guardar.
const SAVE_FORM = document.getElementById('saveForm'),
    DESCRIPCION_C = document.getElementById('descripcion_c'),
    LUGAR_C = document.getElementById('lugar_c'),
    HORA_C = document.getElementById('hora_c'),
    HORA_F_C = document.getElementById('hora_f_c'),
    DESCRIPCION_F = document.getElementById('descripcion_f'),
    LUGAR_F = document.getElementById('lugar_f'),
    HORA_F = document.getElementById('hora_f'),
    HORA_F_F = document.getElementById('hora_f_f'),
    REGALOS = document.getElementById('regalo');

const ENVIAR_FORM = document.getElementById('enviarForm'),
    LINK_INVITACION = document.getElementById('link'),
    ID_INVITADO_ENVIAR = document.getElementById('idInvitadoEnviar');

// Obtener el parámetro de la URL
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('p');

// Elementos <a> que deben heredar el parámetro
const INVITADOS_A = document.getElementById('a_Invitaciones');
const PERSONALIZAR_A = document.getElementById('a_personalizar');

// Verificar si el parámetro 'p' existe antes de actualizar los enlaces
if (id) {
    INVITADOS_A.href = `Invitados.html?p=${id}`;
    PERSONALIZAR_A.href = `personalizacion.html?p=${id}`;
}


// Método del evento para cuando el documento ha cargado.
document.addEventListener('DOMContentLoaded', () => {
    // Llamada a la función para llenar la tabla con los registros existentes.
    fillTable();

});

// Método del evento para cuando se envía el formulario de guardar.
SAVE_FORM.addEventListener('submit', async (event) => {
    // Se evita recargar la página web después de enviar el formulario.
    event.preventDefault();
    // Se verifica la acción a realizar.
    action = 'createRowOrUpdate';
    // Constante tipo objeto con los datos del formulario.
    const FORM = new FormData(SAVE_FORM);
    FORM.append('id_prometido', id);
    // Petición para guardar los datos del formulario.
    const DATA = await fetchData(PERSONALIZACION_API, action, FORM);
    console.log(DATA);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con el error.
    if (DATA.status) {
        // Se muestra un mensaje de éxito.
        sweetAlert(1, DATA.message, true);
        // Se carga nuevamente la tabla para visualizar los cambios.
        fillTable();
    } else {
        console.log(DATA);
        sweetAlert(2, DATA.error, false);
    }
});

/*
*   Función asíncrona para llenar la tabla con los registros disponibles.
*   Parámetros: form (objeto opcional con los datos de búsqueda).
*   Retorno: ninguno.
*/
const fillTable = async (form = null) => {
    // Se define una constante tipo objeto con los datos del registro seleccionado.
    const FORM = new FormData();
    //despues harè que fetchData acepete post sin FORM
    FORM.append('id_prometido', id);
    // Petición para obtener los datos del registro solicitado.
    const DATA = await fetchData(PERSONALIZACION_API, 'readOne', FORM);
    console.log(DATA);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con el error.
    if (DATA.status) {
        // Se inicializan los campos con los datos.
        const ROW = DATA.dataset;
        DESCRIPCION_C.value = ROW.descripcion_ceremonia;
        LUGAR_C.value = ROW.lugar_ceremonia;
        HORA_C.value = ROW.fecha_ceremonia;
        HORA_F_C.value = ROW.fecha_ceremonia_fin;
        DESCRIPCION_F.value = ROW.descripcion_fiesta;
        LUGAR_F.value = ROW.lugar_fiesta;
        HORA_F.value = ROW.fecha_fiesta;
        HORA_F_F.value = ROW.fecha_fiesta_fin;
        REGALOS.value = ROW.descripcion_regalos;
    } else {
        sweetAlert(2, DATA.error, false);
    }
}





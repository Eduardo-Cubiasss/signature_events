// Constante para completar la ruta de la API.
const INVITADO_API = 'services/invitados/cartainvitacion.php';
// Constante para establecer los parametros URL    
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');
// Constantes para establecer los elementos de la página.
const NOMBRE_INVITADO = document.getElementById('nombreInvitadotxt'),
    descripcionC = document.getElementById('descripcion_ceremonia_txt'),
    descripcionF = document.getElementById('descripcion_fiesta_txt'),
    fiestaF = document.getElementById('fecha_fiesta'),
    horaF = document.getElementById('hora_fiesta'),
    fechaC = document.getElementById('fecha_ceremonia'),
    horaC = document.getElementById('hora_ceremonia'),
    lugarc = document.getElementById('lugar_ceremonia'),
    lugarf = document.getElementById('lugar_fiesta');

// Constantes para establecer los elementos del formulario de actualizar.
const UPDATE_FORM = document.getElementById('updateForm'),
    ID_INVITADO = id,
    NOMBRE_UPDATE = document.getElementById('nombre'),
    INVITADOS_ADICIONALES = document.getElementById('invitados_adicionales'),
    ASISTENCIAC = document.getElementById('asistenciaCeremonia'),
    ASISTENCIAF = document.getElementById('asistenciaFiesta'),
    TIPO_ASISTENCIA = document.getElementById('tipoasistencia');
MENSAJE_UPDATE = document.getElementById('mensaje');

//Variables para el recordatorio de google calendar fiesta
var TITULO_f,
    DESCRIPCION_f,
    LUGAR_f,
    FECHAINICIO_f,
    FECHAFINAL_f;

// Variables para el recordatorio de google calendar ceremonia
var TITULO_c,
    DESCRIPCION_c,
    LUGAR_c,
    FECHAINICIO_c,
    FECHAFINAL_c;
// Método del evento para cuando el documento ha cargado.
document.addEventListener('DOMContentLoaded', () => {
    const audio = document.getElementById("background-music");
        // Intenta reproducir el audio
        audio.play().catch(error => {
            console.log("Reproducción automática bloqueada, esperando interacción del usuario.");
        });
    // Llamada a la función para llenar la tabla con los registros existentes.
    openUpdate();

});



function agregarAGoogleCalendar(title, description, location, mysqlStartDate, mysqlEndDate) {
    // Convierte la fecha de MySQL (YYYY-MM-DD HH:MM:SS) al formato de Google Calendar (YYYYMMDDTHHMMSSZ)
    function convertirFechaGoogleCalendar(mysqlDate) {
        const date = new Date(mysqlDate + " UTC"); // Agregar UTC para evitar desajustes de zona horaria
        return date.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
    }

    const startDate = convertirFechaGoogleCalendar(mysqlStartDate);
    const endDate = convertirFechaGoogleCalendar(mysqlEndDate);

    // Codifica los valores para la URL
    const googleCalendarURL = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&details=${encodeURIComponent(description)}&location=${encodeURIComponent(location)}&dates=${startDate}/${endDate}`;

    // Abre el enlace en una nueva pestaña
    window.open(googleCalendarURL, "_blank");
}

function convertirFechaMySQL(mysqlDate) {
    return new Date(mysqlDate.replace(" ", "T") + "Z"); // Convierte el formato DATETIME a un objeto Date
}

function updateCountdown(mysqlDate) {
    const targetDate = convertirFechaMySQL(mysqlDate).getTime();
    const now = new Date().getTime();
    const timeLeft = targetDate - now;

    if (timeLeft <= 0) {
        document.getElementById("countdown-container").innerHTML = "<h2>¡Tiempo terminado!</h2>";
        return;
    }

    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    document.getElementById("days").textContent = days.toString().padStart(2, "0");
    document.getElementById("hours").textContent = hours.toString().padStart(2, "0");
    document.getElementById("minutes").textContent = minutes.toString().padStart(2, "0");
    document.getElementById("seconds").textContent = seconds.toString().padStart(2, "0");
}



function RecordatorioC() {
    agregarAGoogleCalendar(TITULO_c, DESCRIPCION_c, LUGAR_c, FECHAINICIO_c, FECHAFINAL_c);
}

function RecordatorioF() {
    agregarAGoogleCalendar(TITULO_f, DESCRIPCION_f, LUGAR_f, FECHAINICIO_f, FECHAFINAL_f);
}
// Método del evento para cuando se envía el formulario de guardar.
UPDATE_FORM.addEventListener('submit', async (event) => {
    // Se evita recargar la página web después de enviar el formulario.
    event.preventDefault();
    // Se verifica la acción a realizar.
    action = 'UpdateInvitados';
    // Constante tipo objeto con los datos del formulario.
    const FORM = new FormData(UPDATE_FORM);
    // concatena el codigo de pais y el numero de telefono
    FORM.append('idInvitado', ID_INVITADO);
    // Petición para guardar los datos del formulario.
    const DATA = await fetchData(INVITADO_API, action, FORM);
    console.log(DATA);
    console.log('Aún no entra al if');
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con el error.
    if (DATA.status) {
        // Se cierra la caja de diálogo.
        // Se muestra un mensaje de éxito.
        sweetAlert(1, '¡Respuesta enviada!', true);
    } else {
        console.log(DATA);
        console.log('Esto es un error');
        sweetAlert(2, DATA.error, false);
    }
});

function formatearFecha(fechaMySQL) {
    // Crear objeto Date
    const fecha = new Date(fechaMySQL);

    // Obtener hora y minutos
    const horas = fecha.getHours().toString().padStart(2, '0');
    const minutos = fecha.getMinutes().toString().padStart(2, '0');

    // Obtener día, mes y año
    const numeroDia = fecha.getDate();
    const numeroAño = fecha.getFullYear();

    // Meses en español
    const meses = [
        "enero", "febrero", "marzo", "abril", "mayo", "junio",
        "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"
    ];
    const nombreMes = meses[fecha.getMonth()];

    let resultadoAM = 'am';
    if (horas >= 12) {
        resultadoAM = 'pm'
    }
    // Formatear resultados
    const horaMinuto = `${horas}:${minutos}`;
    const fechaCompleta = `${numeroDia} de ${nombreMes} de ${numeroAño}`;
    const amOpm = resultadoAM;
    return { horaMinuto, fechaCompleta, amOpm };
}

/*
*   Función asíncrona para preparar el formulario al momento de actualizar un registro.
*   Parámetros: id (identificador del registro seleccionado).
*   Retorno: ninguno.
*/
const openUpdate = async () => {
    // Se define una constante tipo objeto con los datos del registro seleccionado.
    const FORM = new FormData();
    FORM.append('idInvitado', id);
    console.log('Este es el id del invitado', id)
    // Petición para obtener los datos del registro solicitado.
    const DATA = await fetchData(INVITADO_API, 'readOneNombre', FORM);
    console.log(DATA);
    NOMBRE_INVITADO.textContent = DATA.dataset.nombre_invitado;
    console.log(DATA.dataset.nombre_invitado, 'Hola bro');

    const FORM2 = new FormData();
    FORM2.append('idInvitado', id);
    const DATA2 = await fetchData(INVITADO_API, 'readOne', FORM2);
    console.log(DATA2);
    // Formateamos los datos para obtener el formato deseado
    var FiestaFechaInicio = formatearFecha(DATA2.dataset.fecha_fiesta);
    var CeremoniaFechaInicio = formatearFecha(DATA2.dataset.fecha_ceremonia);
    var FiestaHoraFinal = formatearFecha(DATA2.dataset.fecha_fiesta_fin);
    var CeremoniaHoraFinal = formatearFecha(DATA2.dataset.fecha_ceremonia_fin);
    // introducimos en los html el contenido
    descripcionC.textContent = DATA2.dataset.descripcion_ceremonia;
    descripcionF.textContent = DATA2.dataset.descripcion_fiesta;
    fiestaF.textContent = FiestaFechaInicio.fechaCompleta;
    horaF.textContent = FiestaFechaInicio.horaMinuto + FiestaFechaInicio.amOpm + "-" + FiestaHoraFinal.horaMinuto + FiestaHoraFinal.amOpm;
    fechaC.textContent = CeremoniaFechaInicio.fechaCompleta;
    horaC.textContent = CeremoniaFechaInicio.horaMinuto + CeremoniaFechaInicio.amOpm + "-" + CeremoniaHoraFinal.horaMinuto + CeremoniaHoraFinal.amOpm;

    // Llenamos las variables para el google calendar de fiesta
    TITULO_f = "Fiesta de boda";
    DESCRIPCION_f = DATA2.dataset.descripcion_fiesta;
    LUGAR_f = DATA2.dataset.lugar_fiesta;
    FECHAINICIO_f = DATA2.dataset.fecha_fiesta;
    FECHAFINAL_f = DATA2.dataset.fecha_fiesta_fin;

    // Llenamos las variables para el google calendar de ceremonia
    TITULO_c = "Ceremonia de la boda";
    DESCRIPCION_c = DATA2.dataset.descripcion_ceremonia;
    LUGAR_c = DATA2.dataset.lugar_ceremonia;
    FECHAINICIO_c = DATA2.dataset.fecha_ceremonia;
    FECHAFINAL_c = DATA2.dataset.fecha_ceremonia_fin;
    // Llenamos el contador regresivo:
    // Actualizar cada segundo
    setInterval(() => updateCountdown(FECHAINICIO_c), 1000);
    updateCountdown(FECHAINICIO_c);

    if (!(DATA2.dataset.invitacion_ceremonia == 'Pendiente' && DATA2.dataset.invitacion_fiesta == 'Pendiente')) {
        // Se inicializan los campos del formulario.
        ASISTENCIAC.value = DATA2.dataset.invitacion_ceremonia;
        ASISTENCIAF.value = DATA2.dataset.invitacion_fiesta;
        INVITADOS_ADICIONALES.value = DATA2.dataset.invitados_cant;
        INVITADOS_ADICIONALES.max = DATA2.dataset.invitados_limite;
        MENSAJE_UPDATE.value = DATA2.dataset.mensaje_del_invitado;
        NOMBRE_UPDATE.value = DATA2.dataset.nombre_invitado;

        let opcionSeleccionada = "";

        // Determinar la opción del select basada en las asistencias
        if (DATA2.dataset.invitacion_ceremonia == "Asistirá" && DATA2.dataset.invitacion_fiesta == "Asistirá") {
            opcionSeleccionada = "Cremonia&fiesta";
            console.log("Entre al if");
        } else if (DATA2.dataset.invitacion_ceremonia == "Asistirá" && DATA2.dataset.invitacion_fiesta != "Asistirá") {
            opcionSeleccionada = "SoloCeremonia";
            console.log("Entre al else if");
        } else if (DATA2.dataset.invitacion_fiesta == "Asistirá" && DATA2.dataset.invitacion_ceremonia != "Asistirá") {
            opcionSeleccionada = "SoloFiesta";
            console.log("Entre al else if 2");
        } else {
            opcionSeleccionada = "";
            console.log("Entre al else");
        }

        // Asignar el valor al select
        TIPO_ASISTENCIA.value = opcionSeleccionada;
    }
    else {
        NOMBRE_UPDATE.value = DATA2.dataset.nombre_invitado;
        INVITADOS_ADICIONALES.max = DATA2.dataset.invitados_limite;
        INVITADOS_ADICIONALES.value = 0;
    }
}





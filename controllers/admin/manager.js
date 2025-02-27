// Constante para completar la ruta de la API.
const PROMETIDO_API = 'services/admin/prometido.php';
// Constantes para establecer los elementos de la tabla.
const TABLE_BODY = document.getElementById('table_body');
// Constantes para establecer los elementos del componente Modal.
const SAVE_MODAL = new bootstrap.Modal('#saveModal'),
    UPDATE_MODAL = new bootstrap.Modal('#updateModal');
// Constantes para establecer los elementos del formulario de guardar.
const SAVE_FORM = document.getElementById('saveForm'),
    USUARIO = document.getElementById('usuario'),
    PASS = document.getElementById('pass'),
    PROMETIDO = document.getElementById('prometido'),
    PROMETIDA = document.getElementById('prometida'),
    PROMETIDO_TEL = document.getElementById('prometidoTel'),
    PROMETIDA_TEL = document.getElementById('prometidaTel');

// Constantes para establecer los elementos del formulario de actualizar.
const UPDATE_FORM = document.getElementById('updateForm'),
    ID_PROMETIDO = document.getElementById('idPrometido'),
    PROMETIDO_UPDATE = document.getElementById('prometidoUpdate'),
    PROMETIDA_UPDATE = document.getElementById('prometidaUpdate'),
    PROMETIDO_TEL_UPDATE = document.getElementById('prometidoTelUpdate'),
    PROMETIDA_TEL_UPDATE = document.getElementById('prometidaTelUpdate');

// Método del evento para cuando el documento ha cargado.
document.addEventListener('DOMContentLoaded', () => {
    // Llamada a la función para llenar la tabla con los registros existentes.
    fillTable();

});

const countries = [
    { name: 'Argentina', code: '+54', maxDigits: 10 },
    { name: 'Bolivia', code: '+591', maxDigits: 8 },
    { name: 'Brasil', code: '+55', maxDigits: 11 },
    { name: 'Canadá', code: '+1', maxDigits: 10 },
    { name: 'Chile', code: '+56', maxDigits: 9 },
    { name: 'Colombia', code: '+57', maxDigits: 10 },
    { name: 'Costa Rica', code: '+506', maxDigits: 8 },
    { name: 'Cuba', code: '+53', maxDigits: 8 },
    { name: 'Ecuador', code: '+593', maxDigits: 9 },
    { name: 'El Salvador', code: '+503', maxDigits: 8 },
    { name: 'Guatemala', code: '+502', maxDigits: 8 },
    { name: 'Honduras', code: '+504', maxDigits: 8 },
    { name: 'México', code: '+52', maxDigits: 10 },
    { name: 'Nicaragua', code: '+505', maxDigits: 8 },
    { name: 'Panamá', code: '+507', maxDigits: 8 },
    { name: 'Paraguay', code: '+595', maxDigits: 9 },
    { name: 'Perú', code: '+51', maxDigits: 9 },
    { name: 'República Dominicana', code: '+1', maxDigits: 10 },
    { name: 'Uruguay', code: '+598', maxDigits: 9 },
    { name: 'Venezuela', code: '+58', maxDigits: 10 },
    { name: 'Alemania', code: '+49', maxDigits: 11 },
    { name: 'España', code: '+34', maxDigits: 9 },
    { name: 'Francia', code: '+33', maxDigits: 9 },
    { name: 'Italia', code: '+39', maxDigits: 10 },
    { name: 'Países Bajos', code: '+31', maxDigits: 9 },
    { name: 'Portugal', code: '+351', maxDigits: 9 },
    { name: 'Reino Unido', code: '+44', maxDigits: 10 },
    { name: 'Rusia', code: '+7', maxDigits: 10 },
    { name: 'Suecia', code: '+46', maxDigits: 10 },
    { name: 'Suiza', code: '+41', maxDigits: 10 },
    { name: 'Bangladesh', code: '+880', maxDigits: 10 },
    { name: 'China', code: '+86', maxDigits: 11 },
    { name: 'India', code: '+91', maxDigits: 10 },
    { name: 'Indonesia', code: '+62', maxDigits: 10 },
    { name: 'Japón', code: '+81', maxDigits: 10 },
    { name: 'Pakistán', code: '+92', maxDigits: 10 },
    { name: 'Turquía', code: '+90', maxDigits: 10 },
    { name: 'Vietnam', code: '+84', maxDigits: 10 }
];
function generateSecureUsername(length = 10) {
    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let username = '';
    for (let i = 0; i < length; i++) {
        username += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return username;
}

function generateSecurePassword(length = 12) {
    const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lower = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';
    const allChars = upper + lower + numbers + symbols;

    let password = '';
    password += upper.charAt(Math.floor(Math.random() * upper.length));
    password += lower.charAt(Math.floor(Math.random() * lower.length));
    password += numbers.charAt(Math.floor(Math.random() * numbers.length));
    password += symbols.charAt(Math.floor(Math.random() * symbols.length));

    for (let i = 4; i < length; i++) {
        password += allChars.charAt(Math.floor(Math.random() * allChars.length));
    }

    return password.split('').sort(() => Math.random() - 0.5).join('');
}

function initializePhoneInput(countrySelectId, phoneInputId, errorTextId) {
    const countrySelect = document.getElementById(countrySelectId);
    const phoneInput = document.getElementById(phoneInputId);
    const errorText = document.getElementById(errorTextId);

    countrySelect.innerHTML = '';
    countries.forEach(country => {
        const option = document.createElement('option');
        option.value = country.code;
        option.textContent = `${country.name} (${country.code})`;
        countrySelect.appendChild(option);
    });

    countrySelect.addEventListener('change', () => {
        phoneInput.value = '';
        errorText.classList.add('d-none');
    });

    phoneInput.addEventListener('input', () => {
        const selectedPrefix = countrySelect.value;
        const country = countries.find(c => c.code === selectedPrefix);
        const maxDigits = country ? country.maxDigits : 10;

        phoneInput.value = phoneInput.value.replace(/\s/g, '');
        if (phoneInput.value.length > maxDigits) {
            phoneInput.value = phoneInput.value.slice(0, maxDigits);
        }
    });

    phoneInput.addEventListener('blur', () => {
        const selectedPrefix = countrySelect.value;
        const country = countries.find(c => c.code === selectedPrefix);
        const maxDigits = country ? country.maxDigits : 10;

        if (phoneInput.value.length < 5 || phoneInput.value.length > maxDigits) {
            errorText.classList.remove('d-none');
        } else {
            errorText.classList.add('d-none');
        }
    });
}

// Método del evento para cuando se envía el formulario de guardar.
SAVE_FORM.addEventListener('submit', async (event) => {
    // Se evita recargar la página web después de enviar el formulario.
    event.preventDefault();
    // Se verifica la acción a realizar.
    action = 'createRow';
    // Constante tipo objeto con los datos del formulario.
    const FORM = new FormData(SAVE_FORM);
    // extrae el codigo de pais y el numero de telefono
    let prometidoTel = document.getElementById('prometidoTel').value;
    let prometidaTel = document.getElementById('prometidaTel').value;
    let codigoPrometido = document.getElementById('country-code-1').value;
    let codigoPrometida = document.getElementById('country-code2').value;
    // concatena el codigo de pais y el numero de telefono
    FORM.append('num_prometido', codigoPrometido + ',' + prometidoTel);
    FORM.append('num_prometida', codigoPrometida + ',' + prometidaTel);
    // Petición para guardar los datos del formulario.
    const DATA = await fetchData(PROMETIDO_API, action, FORM);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con el error.
    if (DATA.status) {
        // Se cierra la caja de diálogo.
        SAVE_MODAL.hide();
        // Se muestra un mensaje de éxito.
        sweetAlert(1, DATA.message, true);
        // Se carga nuevamente la tabla para visualizar los cambios.
        fillTable();
    } else {
        sweetAlert(2, DATA.error, false);
    }
});

// Método del evento para cuando se envía el formulario de guardar.
UPDATE_FORM.addEventListener('submit', async (event) => {
    // Se evita recargar la página web después de enviar el formulario.
    event.preventDefault();
    // Se verifica la acción a realizar.
    action = 'updateRow';
    // Constante tipo objeto con los datos del formulario.
    const FORM = new FormData(UPDATE_FORM);
    // extrae el codigo de pais y el numero de telefono
    let prometidoTel = document.getElementById('prometidoTelUpdate').value;
    let prometidaTel = document.getElementById('prometidaTelUpdate').value;
    let codigoPrometido = document.getElementById('country-code-1-u').value;
    let codigoPrometida = document.getElementById('country-code2-u').value;
    // concatena el codigo de pais y el numero de telefono
    FORM.append('num_prometido', codigoPrometido + ',' + prometidoTel);
    FORM.append('num_prometida', codigoPrometida + ',' + prometidaTel);
    // Petición para guardar los datos del formulario.
    const DATA = await fetchData(PROMETIDO_API, action, FORM);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con el error.
    if (DATA.status) {
        // Se cierra la caja de diálogo.
        UPDATE_MODAL.hide();
        // Se muestra un mensaje de éxito.
        sweetAlert(1, DATA.message, true);
        // Se carga nuevamente la tabla para visualizar los cambios.
        fillTable();
    } else {
        sweetAlert(2, DATA.error, false);
    }
});

/*
*   Función asíncrona para llenar la tabla con los registros disponibles.
*   Parámetros: form (objeto opcional con los datos de búsqueda).
*   Retorno: ninguno.
*/
const fillTable = async (form = null) => {
    // Se inicializa el contenido de la tabla.
    TABLE_BODY.innerHTML = '';
    // Se verifica la acción a realizar.
    // Petición para obtener los registros disponibles.
    const DATA = await fetchData(PROMETIDO_API, 'readAll', form);
    console.log(DATA);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con el error.
    if (DATA.status) {
        // Se recorre el conjunto de registros fila por fila.
        DATA.dataset.forEach(row => {
            // Se crean y concatenan las filas de la tabla con los datos de cada registro.
            TABLE_BODY.innerHTML += `
                <tr>
                    <td>${row.usuario}</td>
                    <td>${row.prometido}</td>
                    <td>${row.prometida}</td>
                    <td>
                        <button type="button" class="btn btn-warning" onclick="openBoda(${row.id_usuario})">
                            <i class="fas fa-file-alt"></i> <!-- Documento relacionado a una boda -->
                        </button>
                    </td>
                    <td>
                        <button type="button" class="btn btn-info" onclick="openUpdate(${row.id_usuario})">
                            <i class="fas fa-edit"></i> <!-- Edición -->
                        </button>
                    </td>
                    <td>
                        <button type="button" class="btn btn-danger" onclick="openDelete(${row.id_usuario})">
                            <i class="fas fa-trash-alt"></i> <!-- Eliminación con un ícono más estilizado -->
                        </button>
                    </td>
                </tr>
            `;
        });
    } else {
        sweetAlert(4, DATA, true);
    }
}

/*
*   Función para preparar el formulario al momento de insertar un registro.
*   Parámetros: ninguno.
*   Retorno: ninguno.
*/
const openCreate = () => {
    // Se muestra la caja de diálogo con su título.
    SAVE_MODAL.show();
    // Se prepara el formulario.
    SAVE_FORM.reset();
    // Se inicializan los campos.
    initializePhoneInput('country-code-1', 'prometidoTel', 'phone-error1_A');
    initializePhoneInput('country-code2', 'prometidaTel', 'phone-error2');
    var user = generateSecureUsername(7);
    var contrasena = generateSecurePassword(8);
    USUARIO.value = user;
    PASS.value = contrasena;
}

/*
*   Función asíncrona para abrir el documento relacionado a una boda.
*   Parámetros: id (identificador del registro seleccionado).
*/
const openBoda = async (id) => {
    window.open(`Invitados.html?p=${id}`, '_blank');
}

/*
*   Función asíncrona para preparar el formulario al momento de actualizar un registro.
*   Parámetros: id (identificador del registro seleccionado).
*   Retorno: ninguno.
*/
const openUpdate = async (id) => {
    // Se define una constante tipo objeto con los datos del registro seleccionado.
    const FORM = new FormData();
    FORM.append('id_usuario', id);
    // Petición para obtener los datos del registro solicitado.
    const DATA = await fetchData(PROMETIDO_API, 'readOne', FORM);
    console.log(DATA);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con el error.
    if (DATA.status) {
        // Se muestra la caja de diálogo con su título.
        UPDATE_MODAL.show();
        // Se prepara el formulario.
        UPDATE_FORM.reset();
        initializePhoneInput('country-code-1-u', 'prometidoTelUpdate', 'phone-error1-u');
        initializePhoneInput('country-code2-u', 'prometidaTelUpdate', 'phone-error2-u');
        // Se inicializan los campos con los datos.
        const ROW = DATA.dataset;
        //Crea una variable string que sea resultado de cortar el ROW.num_prometido y extraer lo que hay despues de la coma
        let num_prometido = ROW.num_prometido.split(",")[1];
        let num_prometida = ROW.num_prometida.split(",")[1];
        let codigoPrometido = ROW.num_prometido.split(",")[0];
        let codigoPrometida = ROW.num_prometida.split(",")[0];
        //Se asigna el valor de la variable a los campos de telefono
        document.getElementById('country-code-1-u').value = codigoPrometido;
        document.getElementById('country-code2-u').value = codigoPrometida;
        ID_PROMETIDO.value = ROW.id_usuario;
        PROMETIDO_UPDATE.value = ROW.prometido;
        PROMETIDA_UPDATE.value = ROW.prometida;
        PROMETIDO_TEL_UPDATE.value = num_prometido;
        PROMETIDA_TEL_UPDATE.value = num_prometida;
    } else {
        sweetAlert(2, DATA.error, false);
    }
}

/*
*   Función asíncrona para eliminar un registro.
*   Parámetros: id (identificador del registro seleccionado).
*   Retorno: ninguno.
*/
const openDelete = async (id) => {
    // Llamada a la función para mostrar un mensaje de confirmación, capturando la respuesta en una constante.
    const RESPONSE = await confirmAction('¿Desea eliminar al prometido de forma permanente?');
    // Se verifica la respuesta del mensaje.
    if (RESPONSE) {
        // Se define una constante tipo objeto con los datos del registro seleccionado.
        const FORM = new FormData();
        FORM.append('id_usuario', id);
        // Petición para eliminar el registro seleccionado.
        const DATA = await fetchData(PROMETIDO_API, 'deleteRow', FORM);
        // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con el error.
        if (DATA.status) {
            // Se muestra un mensaje de éxito.
            await sweetAlert(1, DATA.message, true);
            // Se carga nuevamente la tabla para visualizar los cambios.
            fillTable();
        } else {
            sweetAlert(2, DATA.error, false);
        }
    }
}




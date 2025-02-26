<?php
// Se incluye la clase del modelo.
require_once('../../models/data/prometido_data.php');

// Se comprueba si existe una acción a realizar, de lo contrario se finaliza el script con un mensaje de error.
if (isset($_GET['action'])) {
    // Se crea una sesión o se reanuda la actual para poder utilizar variables de sesión en el script.
    session_start();
    // Se instancia la clase correspondiente.
    $prometido = new PrometidoData;
    // Se declara e inicializa un arreglo para guardar el resultado que retorna la API.
    $result = array('status' => 0, 'message' => null, 'dataset' => null, 'error' => null, 'exception' => null, 'fileStatus' => null);
    // Se verifica si existe una sesión iniciada como administrador, de lo contrario se finaliza el script con un mensaje de error.
    if (isset($_SESSION['idAdministrador'])) {
        // Se compara la acción a realizar cuando un administrador ha iniciado sesión.
        switch ($_GET['action']) {
            case 'createRow':
                $_POST = Validator::validateForm($_POST);
                if (
                    !$prometido->setUsuario($_POST['usuario']) or
                    !$prometido->setClave($_POST['pass']) or
                    !$prometido->setPrometido($_POST['prometido']) or
                    !$prometido->setPrometida($_POST['prometida']) or
                    !$prometido->setNumeroPrometido($_POST['num_prometido']) or
                    !$prometido->setNumeroPrometida($_POST['num_prometida'])
                ) {
                    $result['error'] = $prometido->getDataError();
                } elseif ($prometido->createRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Cuenta creado correctamente';
                } else {
                    $result['error'] = 'Ocurrió un problema al crear la cuenta';
                }
                break;
            case 'readAll':
                if ($result['dataset'] = $prometido->readAll()) {
                    $result['status'] = 1;
                    $result['message'] = 'Existen ' . count($result['dataset']) . ' registros';
                } else {
                    $result['error'] = 'No existen cuentas registrados';
                }
                break;
            case 'readOne':
                if (!$prometido->setId($_POST['id_usuario'])) {
                    $result['error'] = $prometido->getDataError();
                } elseif ($result['dataset'] = $prometido->readOne()) {
                    $result['status'] = 1;
                } else {
                    $result['error'] = 'Cuenta inexistente';
                }
                break;
            case 'updateRow':
                $_POST = Validator::validateForm($_POST);
                if (
                    !$prometido->setPrometido($_POST['prometido']) or
                    !$prometido->setPrometida($_POST['prometida']) or
                    !$prometido->setNumeroPrometido($_POST['num_prometido']) or
                    !$prometido->setNumeroPrometida($_POST['num_prometida']) or
                    !$prometido->setId($_POST['id_usuario'])
                ) {
                    $result['error'] = $prometido->getDataError();
                } elseif ($prometido->updateRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Cuenta modificado correctamente';
                } else {
                    $result['error'] = 'Ocurrió un problema al modificar la cuenta';
                }
                break;
            case 'deleteRow':
                if (
                    !$prometido->setId($_POST['id_usuario'])
                ) {
                    $result['error'] = $prometido->getDataError();
                } elseif ($prometido->deleteRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Cuenta eliminado correctamente';
                } else {
                    $result['error'] = 'Ocurrió un problema al eliminar la cuenta';
                }
                break;
            default:
                $result['error'] = 'Acción no disponible dentro de la sesión';
        }
        // Se obtiene la excepción del servidor de base de datos por si ocurrió un problema.
        $result['exception'] = Database::getException();
        // Se indica el tipo de contenido a mostrar y su respectivo conjunto de caracteres.
        header('Content-type: application/json; charset=utf-8');
        // Se imprime el resultado en formato JSON y se retorna al controlador.
        print(json_encode($result));
    } else {
        print(json_encode('Acceso denegado'));
    }
} else {
    print(json_encode('Recurso no disponible'));
}

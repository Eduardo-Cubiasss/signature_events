<?php
// Se incluye la clase del modelo.
require_once('../../models/data/invitado_data.php');

// Se comprueba si existe una acción a realizar, de lo contrario se finaliza el script con un mensaje de error.
if (isset($_GET['action'])) {
    // Se crea una sesión o se reanuda la actual para poder utilizar variables de sesión en el script.
    session_start();
    // Se instancia la clase correspondiente.
    $invitado = new InvitadoData();
    // Se declara e inicializa un arreglo para guardar el resultado que retorna la API.
    $result = array('status' => 0, 'message' => null, 'dataset' => null, 'error' => null, 'exception' => null, 'fileStatus' => null);
    // Se verifica si existe una sesión iniciada como administrador, de lo contrario se finaliza el script con un mensaje de error.
    if (isset($_SESSION['id_prometido'])) {
        // Se compara la acción a realizar cuando un administrador ha iniciado sesión.
        switch ($_GET['action']) {
            case 'createRow':
                $_POST = Validator::validateForm($_POST);
                if (
                    !$invitado->setnombre($_POST['nombre']) or
                    !$invitado->setInvitadosLimite($_POST['invitadosLimite']) or
                    !$invitado->setNumeroInvitado($_POST['numeroInvitado'])
                ) {
                    $result['error'] = $invitado->getDataError();
                } elseif ($invitado->createRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Invitado registrado correctamente';
                } else {
                    $result['error'] = 'Ocurrió un problema al registrar el invitado';
                }
                break;
            case 'readAll':
                if ($result['dataset'] = $invitado->readAll()) {
                    $result['status'] = 1;
                    $result['message'] = 'Existen ' . count($result['dataset']) . ' registros';
                } else {
                    $result['error'] = 'No existen invitados registrados';
                }
                break;
            case 'readOne':
                if (!$invitado->setId($_POST['id_invitado'])) {
                    $result['error'] = $invitado->getDataError();
                } elseif ($result['dataset'] = $invitado->readOne()) {
                    $result['status'] = 1;
                } else {
                    $result['error'] = 'Invitado inexistente';
                }
                break;
            case 'updateRow':
                $_POST = Validator::validateForm($_POST);
                if (
                    !$invitado->setnombre($_POST['nombre']) or
                    !$invitado->setInvitadosLimite($_POST['invitadosLimite']) or
                    !$invitado->setNumeroInvitado($_POST['numeroInvitado']) or
                    !$invitado->setId($_POST['id_invitado'])
                ) {
                    $result['error'] = $invitado->getDataError();
                } elseif ($invitado->updateRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Invitado modificado correctamente';
                } else {
                    $result['error'] = 'Ocurrió un problema al modificar al invitado';
                }
                break;
            case 'deleteRow':
                if (
                    !$invitado->setId($_POST['id_invitado'])
                ) {
                    $result['error'] = $invitado->getDataError();
                } elseif ($invitado->deleteRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Invitado eliminado correctamente';
                } else {
                    $result['error'] = 'Ocurrió un problema al eliminar al invitado';
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

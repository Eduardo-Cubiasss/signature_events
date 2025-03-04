<?php
// Se incluye la clase del modelo.
require_once('../../models/data/cartainvitacion_data.php');

// Se comprueba si existe una acción a realizar, de lo contrario se finaliza el script con un mensaje de error.
if (isset($_GET['action'])) {
    // Se instancia la clase correspondiente.
    $carta = new cartainvitacionData;
    // Se declara e inicializa un arreglo para guardar el resultado que retorna la API.
    $result = array('status' => 0, 'message' => null, 'dataset' => null, 'error' => null, 'exception' => null);
    // Se compara la acción a realizar según la petición del controlador.
    switch ($_GET['action']) {
        case 'UpdateInvitados':
            $_POST = Validator::validateForm($_POST);
            if (
                !$carta->setNombre($_POST['nombre']) or
                !$carta->setInvitadosAdicionales($_POST['invitadosAdicionales']) or
                !$carta->setAsistenciaCremonia($_POST['asistenciaCeremonia']) or
                !$carta->setAsistenciaFiesta($_POST['asistenciaFiesta']) or
                !$carta->setIdInvitado($_POST['idInvitado']) or
                !$carta->setMensaje($_POST['mensaje'])
            ) {
                $result['error'] = $carta->getDataError();
            } elseif ($carta->updateInvitados()) {
                $result['status'] = 1;
                $result['message'] = 'Respuesta enviada';
            } else {
                $result['error'] = 'Ocurrió un problema al enviar tu respuesta';
            }
            break;
        case 'readOne':
            if (!$carta->setIdInvitado($_POST['idInvitado'])) {
                $result['error'] = $carta->getDataError();
            } elseif ($result['dataset'] = $carta->readOne()) {
                $result['status'] = 1;
            } else {
                $result['error'] = 'Informacion inexistente';
            }
            break;
            case 'readOneNombre':
                if (!$carta->setIdInvitado($_POST['idInvitado'])) {
                    $result['error'] = $carta->getDataError();
                } elseif ($result['dataset'] = $carta->readOneNombre()) {
                    $result['status'] = 1;
                } else {
                    $result['error'] = 'Informacion inexistente';
                }
                break;
                case 'readOneInvitacion':
                    if (!$carta->setIdInvitado($_POST['idInvitado'])) {
                        $result['error'] = $carta->getDataError();
                    } elseif ($result['dataset'] = $carta->readOneInvitacion()) {
                        $result['status'] = 1;
                    } else {
                        $result['error'] = 'Informacion inexistente';
                    }
                    break;
                    
        default:
            $result['error'] = 'Acción no disponible';
    }
    // Se obtiene la excepción del servidor de base de datos por si ocurrió un problema.
    $result['exception'] = Database::getException();
    // Se indica el tipo de contenido a mostrar y su respectivo conjunto de caracteres.
    header('Content-type: application/json; charset=utf-8');
    // Se imprime el resultado en formato JSON y se retorna al controlador.
    print(json_encode($result));
} else {
    print(json_encode('Recurso no disponible'));
}

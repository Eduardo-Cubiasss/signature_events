<?php
// Se incluye la clase del modelo.
require_once('../../models/data/personalizacion_data.php');

// Se comprueba si existe una acción a realizar, de lo contrario se finaliza el script con un mensaje de error.
if (isset($_GET['action'])) {
    // Se crea una sesión o se reanuda la actual para poder utilizar variables de sesión en el script.
    session_start();
    // Se instancia la clase correspondiente.
    $personalizacion = new PersonalizacionData();
    // Se declara e inicializa un arreglo para guardar el resultado que retorna la API.
    $result = array('status' => 0, 'session' => 0, 'message' => null, 'dataset' => null, 'error' => null, 'exception' => null, 'fileStatus' => null);
    // Se verifica si existe una sesión iniciada como administrador, de lo contrario se finaliza el script con un mensaje de error.
    if (isset($_SESSION['id_prometido'])) {
        $result['session'] = 1;
        // Se compara la acción a realizar cuando un administrador ha iniciado sesión.
        switch ($_GET['action']) {
            case 'createRowOrUpdate':
                $_POST = Validator::validateForm($_POST);
                if (
                    !$personalizacion->setDescripcionCeremonia($_POST['descripcion_ceremonia']) or
                    !$personalizacion->setFechaCeremonia($_POST['fecha_ceremonia']) or
                    !$personalizacion->setFechaFiesta($_POST['fecha_fiesta']) or
                    !$personalizacion->setFechaCeremoniaFin($_POST['fecha_ceremonia_fin']) or
                    !$personalizacion->setFechaFiestaFin($_POST['fecha_fiesta_fin']) or
                    !$personalizacion->setDescripcionFiesta($_POST['descripcion_fiesta']) or
                    !$personalizacion->setDescripcionRegalo($_POST['descripcion_regalos']) or
                    !$personalizacion->setLugarFiesta($_POST['lugar_fiesta']) or
                    !$personalizacion->setLugarCeremonia($_POST['lugar_ceremonia']) or
                    !$personalizacion->setIdPrometido($_SESSION['id_prometido'])
                ) {
                    $result['error'] = $personalizacion->getDataError();
                } elseif ($personalizacion->createRowOrUpdate()) {
                    $result['status'] = 1;
                    $result['message'] = 'Datos actualizados de la boda';
                } else {
                    $result['error'] = 'Ocurrió un problema al registrar la boda';
                }
                break;
            case 'readOne':
                if (!$personalizacion->setIdPrometido($_SESSION['id_prometido'])) {
                    $result['error'] = $personalizacion->getDataError();
                } elseif ($result['dataset'] = $personalizacion->readOne()) {
                    $result['status'] = 1;
                } else {
                    $result['error'] = 'Boda inexistente';
                }
                break;
            case 'logOut':
                if (session_destroy()) {
                    $result['status'] = 1;
                    $result['message'] = 'Sesión eliminada correctamente';
                } else {
                    $result['error'] = 'Ocurrió un problema al cerrar la sesión';
                }
                break;
            default:
                $result['error'] = 'Acción no disponible dentro de la sesión';
        }
    } else {
        // Se compara la acción a realizar cuando el administrador no ha iniciado sesión.
        switch ($_GET['action']) {
            case 'logIn':
                $_POST = Validator::validateForm($_POST);
                if ($personalizacion->checkUser($_POST['alias'], $_POST['clave'])) {
                    $result['status'] = 1;
                    $result['message'] = 'Autenticación correcta';
                } else {
                    $result['error'] = 'Credenciales incorrectas';
                }
                break;
                case 'readUsers':
                    if ($personalizacion->readAll()) {
                        $result['status'] = 1;
                        $result['message'] = 'Debe autenticarse para ingresar';
                    } else {
                        $result['error'] = 'Debe crear un administrador para comenzar';
                    }
                    break;
            default:
                $result['error'] = 'Acción no disponible fuera de la sesión';
        }
    }
     // Se obtiene la excepción del servidor de base de datos por si ocurrió un problema.
     $result['exception'] = Database::getException();
     // Se indica el tipo de contenido a mostrar y su respectivo conjunto de caracteres.
     header('Content-type: application/json; charset=utf-8');
     // Se imprime el resultado en formato JSON y se retorna al controlador.
     print (json_encode($result));
} else {
    print (json_encode('Recurso no disponible'));
}

<?php
// Encabezado para permitir solicitudes de cualquier origen.
header('Access-Control-Allow-Origin: *');
// Se establece la zona horaria local para la fecha y hora del servidor.
date_default_timezone_set('America/Mexico_City');
// Constantes para establecer las credenciales de conexión con el servidor de bases de datos.
// 

// Credenciales para la base de datos en el servidor de desarrollo.

/*
define('SERVER', 'localhost');
define('DATABASE', 'signature_Events');
define('USERNAME', 'root');
define('PASSWORD', '');
*/

// Credenciales para la base de datos en el servidor de producción.

define('SERVER', 'localhost');
define('DATABASE', 'signature_Events');
define('USERNAME', 'signature');
define('PASSWORD', 'qP5DgMSi');

?>